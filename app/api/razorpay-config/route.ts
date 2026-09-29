import { NextResponse } from 'next/server';

export async function GET() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
  
  if (!keyId) {
    return NextResponse.json(
      { error: 'Razorpay Public Key ID is not configured on the server environment.' },
      { status: 500 }
    );
  }

  // Returns ONLY the public key ID and mode (live vs test)
  const isLive = keyId.startsWith('rzp_live_');

  return NextResponse.json({
    keyId,
    mode: isLive ? 'live' : 'test',
    isLive
  });
}
