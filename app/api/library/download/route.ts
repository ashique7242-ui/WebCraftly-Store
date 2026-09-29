import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifySignedAssetToken } from '@/lib/purchases';

// Product ID to private secure asset file mapping
const SECURE_ASSETS_MAP: Record<string, { fileName: string; relativePath: string; mimeType: string }> = {
  aging_well: {
    fileName: 'What_Nobody_Tells_You_About_Getting_Old_VERIFIED.pdf',
    relativePath: path.join('private_assets', 'What_Nobody_Tells_You_About_Getting_Old_VERIFIED.pdf'),
    mimeType: 'application/pdf'
  }
};

// GET /api/library/download?token=...&productId=...&inline=true|false
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const productId = searchParams.get('productId') || 'aging_well';
    const inline = searchParams.get('inline') === 'true';

    if (!token) {
      return NextResponse.json(
        { error: 'Security verification failed: Missing asset authorization token.' },
        { status: 401 }
      );
    }

    // -------------------------------------------------------------------------
    // 1. Verify HMAC Signature and Token Expiration
    // -------------------------------------------------------------------------
    const verification = verifySignedAssetToken(token);
    if (!verification.valid) {
      console.warn(`[SECURITY ALERT] Invalid or expired download token rejected for productId: ${productId}`);
      return NextResponse.json(
        {
          error: 'Security token invalid or expired (15-minute validity exceeded). Please return to My Library to generate a fresh link.',
          code: 'EXPIRED_OR_INVALID_TOKEN'
        },
        { status: 403 }
      );
    }

    if (verification.productId && verification.productId !== productId) {
      return NextResponse.json(
        { error: 'Token mismatch for requested digital asset.' },
        { status: 403 }
      );
    }

    // -------------------------------------------------------------------------
    // 2. Resolve Private Secure Asset
    // -------------------------------------------------------------------------
    const assetMeta = SECURE_ASSETS_MAP[productId] || SECURE_ASSETS_MAP['aging_well'];
    const filePath = path.join(process.cwd(), assetMeta.relativePath);

    if (!fs.existsSync(filePath)) {
      console.error(`[STORAGE ERROR] Secure asset file missing on disk: ${filePath}`);
      return NextResponse.json(
        { error: 'Digital asset file is currently unavailable. Please contact support.' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const disposition = inline ? 'inline' : 'attachment';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': assetMeta.mimeType,
        'Content-Disposition': `${disposition}; filename="${assetMeta.fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (err: any) {
    console.error('Error serving secure digital asset:', err);
    return NextResponse.json(
      { error: err.message || 'Internal error serving digital asset.' },
      { status: 500 }
    );
  }
}
