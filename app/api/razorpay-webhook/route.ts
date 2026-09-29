import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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
      console.log(`[PAYMENT CAPTURED] ID: ${paymentEntity?.id}, Amount: ${paymentEntity?.amount}, Email: ${paymentEntity?.email}`);
      // Asset unlocking / automated fulfillment logic executed here
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (err: any) {
    console.error('Error handling Razorpay webhook:', err);
    return NextResponse.json({ error: err.message || 'Webhook processing failed.' }, { status: 500 });
  }
}
