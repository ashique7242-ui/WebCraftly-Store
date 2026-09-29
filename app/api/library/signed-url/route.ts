import { NextRequest, NextResponse } from 'next/server';
import { verifyUserOwnsProduct, generateSignedAssetToken } from '@/lib/purchases';

// POST /api/library/signed-url
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, userId, email } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required.' },
        { status: 400 }
      );
    }

    if (!userId && !email) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to access purchased assets.' },
        { status: 401 }
      );
    }

    // -------------------------------------------------------------------------
    // 1. Strict Ownership Verification against Purchases Mapping Table
    // -------------------------------------------------------------------------
    const hasPurchased = await verifyUserOwnsProduct(productId, userId, email);

    if (!hasPurchased) {
      console.warn(`[ACCESS DENIED] User (${userId || email}) attempted to access unpurchased asset: ${productId}`);
      return NextResponse.json(
        {
          error: 'Access Denied: You do not own this digital product. Please purchase the asset to unlock it in your library.',
          code: 'UNAUTHORIZED_ASSET_ACCESS'
        },
        { status: 403 }
      );
    }

    // -------------------------------------------------------------------------
    // 2. Generate Cryptographically Signed, Expiring Download Token (15 min)
    // -------------------------------------------------------------------------
    const { token, expiresAt } = generateSignedAssetToken(productId, userId || '', email || '', 15 * 60 * 1000);
    const downloadUrl = `/api/library/download?token=${token}&productId=${encodeURIComponent(productId)}`;

    return NextResponse.json({
      success: true,
      downloadUrl,
      expiresAt,
      expiresInMinutes: 15,
      fileName: 'What_Nobody_Tells_You_About_Getting_Old_VERIFIED.pdf'
    });
  } catch (err: any) {
    console.error('Error generating signed URL:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate secure asset URL.' },
      { status: 500 }
    );
  }
}
