import { NextRequest, NextResponse } from 'next/server';
import { getUserPurchases, recordPurchase } from '@/lib/purchases';

// GET /api/library/purchases?userId=...&email=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || undefined;
    const email = searchParams.get('email') || undefined;

    if (!userId && !email) {
      return NextResponse.json(
        { error: 'Authentication required. Please provide userId or email.' },
        { status: 401 }
      );
    }

    const purchases = await getUserPurchases(userId, email);

    return NextResponse.json({
      success: true,
      purchases,
      count: purchases.length
    });
  } catch (err: any) {
    console.error('Error fetching user purchases:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch purchases.' },
      { status: 500 }
    );
  }
}

// POST /api/library/purchases - Server/internal recording of completed purchase
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId, customerEmail, orderId, paymentId, amount, currency, licenseType } = body;

    if (!productId || (!userId && !customerEmail)) {
      return NextResponse.json(
        { error: 'Missing required purchase mapping parameters (productId, user identifier).' },
        { status: 400 }
      );
    }

    const purchase = await recordPurchase({
      userId: userId || customerEmail,
      productId,
      customerEmail: customerEmail || '',
      orderId: orderId || `ord_${Date.now()}`,
      paymentId: paymentId || `pay_${Date.now()}`,
      amount: amount || 11,
      currency: currency || 'USD',
      status: 'completed',
      licenseType: licenseType || 'Lifetime Personal & Family Guidance License'
    });

    return NextResponse.json({
      success: true,
      purchase
    });
  } catch (err: any) {
    console.error('Error recording purchase:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to record purchase.' },
      { status: 500 }
    );
  }
}
