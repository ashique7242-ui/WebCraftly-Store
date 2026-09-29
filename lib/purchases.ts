import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface PurchaseRecord {
  purchaseId: string;
  userId: string;
  productId: string;
  customerEmail: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'refunded';
  licenseType: string;
  purchasedAt: string;
}

const STORE_PATH = path.join(process.cwd(), 'private_assets', 'purchases.json');

// Ensure storage directory and file exist
function initStore(): PurchaseRecord[] {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      fs.writeFileSync(STORE_PATH, JSON.stringify([]), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading purchases store:', err);
    return [];
  }
}

export async function recordPurchase(data: Omit<PurchaseRecord, 'purchaseId' | 'purchasedAt'>): Promise<PurchaseRecord> {
  const records = initStore();
  
  // Deterministic composite purchase ID: {userId}_{productId}
  const purchaseId = `${data.userId || data.customerEmail}_${data.productId}`;
  
  // Check if already recorded
  const existing = records.find(p => p.purchaseId === purchaseId || (p.paymentId && p.paymentId === data.paymentId));
  if (existing) {
    return existing;
  }

  const newRecord: PurchaseRecord = {
    ...data,
    purchaseId,
    purchasedAt: new Date().toISOString()
  };

  records.push(newRecord);

  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving purchase record:', err);
  }

  return newRecord;
}

export async function getUserPurchases(userId?: string, email?: string): Promise<PurchaseRecord[]> {
  const records = initStore();
  if (!userId && !email) return [];

  const normalizedEmail = (email || '').trim().toLowerCase();
  
  return records.filter(p => {
    const matchUid = userId && p.userId && p.userId === userId;
    const matchEmail = normalizedEmail && p.customerEmail && p.customerEmail.trim().toLowerCase() === normalizedEmail;
    return matchUid || matchEmail;
  });
}

export async function verifyUserOwnsProduct(productId: string, userId?: string, email?: string): Promise<boolean> {
  const userPurchases = await getUserPurchases(userId, email);
  return userPurchases.some(p => p.productId === productId && p.status === 'completed');
}

// Generate an HMAC-signed temporary token for private asset download
export function generateSignedAssetToken(productId: string, userId: string, email: string, expiresInMs: number = 15 * 60 * 1000): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + expiresInMs;
  const secret = process.env.RAZORPAY_KEY_SECRET || 'webcraftly_secure_vault_secret_key_2026';
  
  const payload = `${productId}|${userId}|${email}|${expiresAt}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(JSON.stringify({ productId, userId, email, expiresAt, signature })).toString('base64url');

  return { token, expiresAt };
}

// Validate HMAC-signed temporary token
export function verifySignedAssetToken(token: string): { valid: boolean; productId?: string; userId?: string; email?: string } {
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf-8');
    const data = JSON.parse(raw);
    const { productId, userId, email, expiresAt, signature } = data;

    if (!productId || !expiresAt || !signature) {
      return { valid: false };
    }

    if (Date.now() > expiresAt) {
      return { valid: false }; // Token expired
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'webcraftly_secure_vault_secret_key_2026';
    const payload = `${productId}|${userId}|${email}|${expiresAt}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (signature !== expectedSignature) {
      return { valid: false };
    }

    return { valid: true, productId, userId, email };
  } catch (err) {
    return { valid: false };
  }
}
