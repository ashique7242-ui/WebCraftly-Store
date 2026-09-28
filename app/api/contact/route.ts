import { NextRequest, NextResponse } from 'next/server';

// Handle CORS preflight options request across subdomains
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    },
  });
}

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
      name: name.trim(),
      email: email.trim().toLowerCase(),
      issue: issue.trim(),
      receivedAt: new Date().toISOString(),
    };

    console.log('[WebCraftly Support Desk] New Inquiry Received:', inquiry);

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully received. We will respond within 24 hours.',
        inquiry: {
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
