import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Check existing cookie preference
  const existingCurrency = request.cookies.get('webcraftly_currency')?.value;
  const existingCountry = request.cookies.get('webcraftly_country')?.value;

  if (existingCurrency && existingCountry) {
    // Preserve user-selected preferences
    response.headers.set('x-user-currency', existingCurrency);
    response.headers.set('x-user-country', existingCountry);
    return response;
  }

  // 2. Edge Geolocation auto-detection via request headers
  // Vercel Edge: x-vercel-ip-country, Cloudflare: cf-ipcountry, Fastly/Generic: x-country-code
  const geoCountry = (
    request.headers.get('x-vercel-ip-country') ||
    request.geo?.country ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    ''
  ).toUpperCase();

  const isIndia = geoCountry === 'IN';
  const detectedCurrency = isIndia ? 'INR' : 'USD';
  const detectedCountry = geoCountry || (isIndia ? 'IN' : 'US');

  // 3. Set persistent cookies (1 year) to prevent repeated lookups and zero-flicker client hydration
  const oneYear = 60 * 60 * 24 * 365;

  response.cookies.set('webcraftly_currency', detectedCurrency, {
    path: '/',
    maxAge: oneYear,
    sameSite: 'lax',
  });

  response.cookies.set('webcraftly_country', detectedCountry, {
    path: '/',
    maxAge: oneYear,
    sameSite: 'lax',
  });

  // Pass custom headers for server components
  response.headers.set('x-user-currency', detectedCurrency);
  response.headers.set('x-user-country', detectedCountry);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (_api/...)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo images, public assets
     */
    '/((?!api|_next/static|_next/image|assets|favicon|.*\\..*).*)',
  ],
};
