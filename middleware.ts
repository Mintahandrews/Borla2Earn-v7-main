import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Public routes that don't require authentication
  const publicPaths = ['/auth/login', '/auth/signup', '/auth/welcome'];
  
  // If it's a public path, allow access
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected routes
  if (!token && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/signup',
    '/auth/welcome'
  ],
};
