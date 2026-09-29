import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { recordPurchase } from '@/lib/purchases';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookSignature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    if (!webhookSecret) {
      console.error('[SECURITY ALERT] Webhook secret not configured.');
      return NextResponse.json({ error: 'Webhook secret missing.' }, { status: 500 });
    }

    if (!webhookSignature) {
      return NextResponse.json({ error: 'Missing x-razorpay-signature header.' }, { status: 400 });
    }

    // Cryptographic validation of Razorpay Webhook Payload
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf-8'),
      Buffer.from(webhookSignature, 'utf-8')
    );

    if (!isValid) {
      console.warn('[SECURITY ALERT] Invalid webhook signature detected.');
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Process payment events (e.g. payment.captured, order.paid)
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;
      const email = paymentEntity?.email || orderEntity?.receipt || 'customer@webcraftly.site';
      const orderId = paymentEntity?.order_id || orderEntity?.id || 'manual_order';
      const paymentId = paymentEntity?.id || 'manual_payment';
      const productId = paymentEntity?.notes?.productId || orderEntity?.notes?.productId || 'aging_well';
      const customerUserId = paymentEntity?.notes?.userId || `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;

      console.log(`[PAYMENT CAPTURED] ID: ${paymentId}, Amount: ${paymentEntity?.amount}, Email: ${email}`);

      // Automated digital asset fulfillment & database persistence
      await recordPurchase({
        userId: customerUserId,
        productId,
        customerEmail: email,
        orderId,
        paymentId,
        amount: (paymentEntity?.amount ? paymentEntity.amount / 100 : 11),
        currency: paymentEntity?.currency || 'USD',
        status: 'completed',
        licenseType: 'Lifetime Commercial License'
      });
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (err: any) {
    console.error('Error handling Razorpay webhook:', err);
    return NextResponse.json({ error: err.message || 'Webhook processing failed.' }, { status: 500 });
  }
}
