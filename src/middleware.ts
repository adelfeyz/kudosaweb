import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('host') || '';
  const hostname = hostHeader.split(':')[0];

  // Redirect www → apex on https, without the internal listen port (e.g. :3010)
  if (hostname.startsWith('www.')) {
    const apex = hostname.slice(4);
    const dest = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${apex}`);
    return NextResponse.redirect(dest, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
