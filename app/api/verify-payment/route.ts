import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { recordPurchase, generateSignedAssetToken } from '@/lib/purchases';

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
    const customerUserId = body.userId || (email ? `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}` : 'guest_purchaser');
    const productId = body.productId || 'aging_well';

    // Record verified purchase into secure mapping store
    await recordPurchase({
      userId: customerUserId,
      productId: productId,
      customerEmail: email || 'customer@webcraftly.site',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: body.amount || 11,
      currency: body.currency || 'USD',
      status: 'completed',
      licenseType: 'Lifetime Commercial License'
    });

    // Generate signed temporary download token (15-minute expiry)
    const { token, expiresAt } = generateSignedAssetToken(productId, customerUserId, email || '', 15 * 60 * 1000);
    const secureDownloadUrl = `/api/library/download?token=${token}&productId=${encodeURIComponent(productId)}`;

    return NextResponse.json({
      verified: true,
      message: 'Payment verified successfully and asset unlocked.',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      productId: productId,
      userId: customerUserId,
      receiptSentTo: email || 'your email',
      downloadUrl: secureDownloadUrl,
      fileName: 'What_Nobody_Tells_You_About_Getting_Old_VERIFIED.pdf',
      tokenExpiresAt: expiresAt
    });
  } catch (err: any) {
    console.error('Error verifying payment signature:', err);
    return NextResponse.json(
      { error: err.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
