import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Server-side secret coupons registry (never exposed to client)
const SERVER_COUPONS: Record<string, { discountPriceUSD: number; discountPriceINR: number }> = {
  '242': { discountPriceUSD: 0.10, discountPriceINR: 9.00 } // Special $0.10 / ₹9 test price
};

// In-memory rate limiting map (IP -> { count, resetTime })
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const body = await req.json();
    const { productId, couponCode, currency = 'USD' } = body;

    // Default product base prices on server
    const basePriceUSD = 11.00;
    const basePriceINR = 915.00;

    let finalPriceUSD = basePriceUSD;
    let finalPriceINR = basePriceINR;
    let couponApplied = false;

    // Validate coupon securely on server with rate limiting
    if (couponCode) {
      if (!checkRateLimit(ip)) {
        return NextResponse.json(
          { error: 'Too many coupon attempts. Please try again in 10 minutes.' },
          { status: 429 }
        );
      }

      const normalizedCode = String(couponCode).trim().toUpperCase();
      const validCoupon = SERVER_COUPONS[normalizedCode];

      if (validCoupon) {
        finalPriceUSD = validCoupon.discountPriceUSD;
        finalPriceINR = validCoupon.discountPriceINR;
        couponApplied = true;
      } else {
        return NextResponse.json(
          { error: 'Invalid or expired coupon code.' },
          { status: 400 }
        );
      }
    }

    // Determine currency and subunit
    const isINR = currency === 'INR';
    const chosenCurrency = isINR ? 'INR' : 'USD';
    const chosenPrice = isINR ? finalPriceINR : finalPriceUSD;
    const amountSubunits = Math.round(chosenPrice * 100);

    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_ThKSjkVYF2Ikrj';
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let orderId = `order_sim_${Date.now()}`;

    // If real server secret is configured, call Razorpay Orders API
    if (keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await razorpay.orders.create({
        amount: amountSubunits,
        currency: chosenCurrency,
        receipt: `rcpt_${Date.now()}`,
        notes: {
          productId: productId || 'aging_well',
          couponApplied: couponApplied ? 'YES' : 'NO'
        }
      });
      orderId = order.id;
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountSubunits,
      currency: chosenCurrency,
      finalPrice: chosenPrice,
      couponApplied
    });
  } catch (err: any) {
    console.error('Error creating Razorpay order:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create payment order.' },
      { status: 500 }
    );
  }
}
