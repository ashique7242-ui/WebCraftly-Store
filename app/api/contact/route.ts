import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const INQUIRIES_PATH = path.join(process.cwd(), 'private_assets', 'inquiries.json');

// Ensure directory and inquiries store exist
function getStoredInquiries(): any[] {
  try {
    const dir = path.dirname(INQUIRIES_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(INQUIRIES_PATH)) {
      fs.writeFileSync(INQUIRIES_PATH, JSON.stringify([]), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(INQUIRIES_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
}

function saveInquiry(inquiry: any) {
  try {
    const list = getStoredInquiries();
    list.unshift(inquiry); // newest first
    fs.writeFileSync(INQUIRIES_PATH, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting inquiry:', err);
  }
}

// Handle CORS preflight options request across subdomains
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    },
  });
}

// GET /api/contact - Retrieve inquiries
export async function GET() {
  const inquiries = getStoredInquiries();
  return NextResponse.json(
    { success: true, count: inquiries.length, inquiries },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

// POST /api/contact - Submit new customer inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, issue } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters.' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    if (!issue || typeof issue !== 'string' || issue.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Issue/message must be at least 5 characters.' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Contact inquiry record
    const inquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      issue: issue.trim(),
      receivedAt: new Date().toISOString(),
      status: 'new'
    };

    console.log('[WebCraftly Support Desk] New Inquiry Received:', inquiry);
    saveInquiry(inquiry);

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully received. We will respond within 24 hours.',
        inquiry: {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          receivedAt: inquiry.receivedAt,
        },
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('[WebCraftly Support] Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing contact submission.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
