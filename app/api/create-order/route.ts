import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Conversion rate baseline: 1 USD = 85 INR
const USD_TO_INR_RATE = 85;

// Catalog baseline prices (fallback if not dynamically passed)
const PRODUCT_PRICES: Record<string, { usd: number; inr: number }> = {
  aging_well: { usd: 11.00, inr: 935 },
  finance: { usd: 39.00, inr: 3315 },
  devkit: { usd: 49.00, inr: 4165 },
  creator_pack: { usd: 29.00, inr: 2465 },
  proposalkit: { usd: 35.00, inr: 2975 },
  seo_accelerator: { usd: 45.00, inr: 3825 },
};

// Server-side secret coupons registry (supports both USD and INR)
const SERVER_COUPONS: Record<string, { discountPriceUSD: number; discountPriceINR: number }> = {
  '242': { discountPriceUSD: 0.10, discountPriceINR: 10 } // Special $0.10 USD or ₹10 INR coupon price
};

// In-memory rate limiting map (IP -> { count, resetTime })
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10;
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
    const { productId, couponCode, currency, email } = body;

    // Normalize and determine selected currency: 'INR' or 'USD' (default USD)
    const chosenCurrency = (currency && String(currency).trim().toUpperCase() === 'INR') ? 'INR' : 'USD';

    // Base pricing lookup
    const prodConfig = PRODUCT_PRICES[productId] || PRODUCT_PRICES.aging_well;
    const basePrice = chosenCurrency === 'INR' ? prodConfig.inr : prodConfig.usd;
    let finalPrice = basePrice;
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
        finalPrice = chosenCurrency === 'INR' ? validCoupon.discountPriceINR : validCoupon.discountPriceUSD;
        couponApplied = true;
      } else {
        return NextResponse.json(
          { error: 'Invalid or expired coupon code.' },
          { status: 400 }
        );
      }
    }

    // Subunit calculations:
    // For INR: 1 INR = 100 paise (e.g., ₹935 = 93500 paise, ₹10 = 1000 paise)
    // For USD: 1 USD = 100 cents (e.g., $11.00 = 1100 cents, $0.10 = 10 cents)
    const amountSubunits = Math.round(finalPrice * 100);

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
          currency: chosenCurrency,
          email: email || '',
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
      finalPrice,
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
