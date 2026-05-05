import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This proxy protects all routes except /login.
// We use a simple custom cookie "auth-session" set client-side upon successful Firebase login.
// Firebase Client SDK authenticates and stores tokens in indexedDB, invisible to the proxy.
// Verifying ID tokens in edge proxy is complex.
// This simple cookie approach provides an immediate redirect to /login and prevents layout flashing.
// Actual secure role-based verification happens client-side in the RouteGuard component using the real Firebase Auth state.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const authSession = request.cookies.get('auth-session');

  if (!authSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
