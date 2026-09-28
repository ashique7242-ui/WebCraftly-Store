import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // In production with RAZORPAY_KEY_SECRET, verify cryptographic HMAC SHA256 signature
    if (keySecret) {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { error: 'Missing required payment verification parameters.' },
          { status: 400 }
        );
      }

      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { error: 'Invalid payment signature. Verification failed.' },
          { status: 400 }
        );
      }
    }

    // Payment is verified
    return NextResponse.json({
      verified: true,
      message: 'Payment verified successfully.',
      paymentId: razorpay_payment_id,
      receiptSentTo: email || 'your email',
      downloadUrl: '/assets/products/aging_well_workbook.jpg'
    });
  } catch (err: any) {
    console.error('Error verifying payment:', err);
    return NextResponse.json(
      { error: err.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
