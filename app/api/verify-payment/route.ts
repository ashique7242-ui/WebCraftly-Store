import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // -------------------------------------------------------------------------
    // 1. Strict Live Secret Requirement & Validation
    // -------------------------------------------------------------------------
    if (!keySecret) {
      console.error('[SECURITY ALERT] RAZORPAY_KEY_SECRET is missing. Cannot verify payment signature.');
      return NextResponse.json(
        { error: 'Server configuration error: Payment verification secret missing.' },
        { status: 500 }
      );
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification parameters (order_id, payment_id, signature).' },
        { status: 400 }
      );
    }

    // -------------------------------------------------------------------------
    // 2. Cryptographic HMAC SHA256 Signature Verification
    // Expected signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
    // -------------------------------------------------------------------------
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature, 'utf-8'),
      Buffer.from(razorpay_signature, 'utf-8')
    );

    if (!isValid) {
      console.warn(`[FRAUD ALERT] Signature mismatch for order: ${razorpay_order_id}, payment: ${razorpay_payment_id}`);
      return NextResponse.json(
        { error: 'Invalid payment signature. Verification failed. Access denied.' },
        { status: 400 }
      );
    }

    // -------------------------------------------------------------------------
    // 3. Payment Verified Successfully - Deliver Unlocked Asset
    // -------------------------------------------------------------------------
    return NextResponse.json({
      verified: true,
      message: 'Payment verified successfully.',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      receiptSentTo: email || 'your email',
      downloadUrl: '/assets/products/aging_well_workbook.jpg'
    });
  } catch (err: any) {
    console.error('Error verifying payment signature:', err);
    return NextResponse.json(
      { error: err.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
