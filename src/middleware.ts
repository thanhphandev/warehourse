import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';

const intlMiddleware = createMiddleware(routing);
const PROTECTED_PATHS = ['/dashboard', '/profile', '/orders', '/admin'];
const PUBLIC_AUTH_ONLY_PATHS = ['/auth/login', '/auth/signup'];

function stripLocale(pathname: string, locales: readonly string[]) {
  const hasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  return hasLocale ? pathname.replace(/^\/[^\/]+/, '') : pathname;
}

function getLocale(pathname: string, locales: readonly string[]) {
  const first = pathname.split('/')[1];
  return locales.includes(first) ? first : locales[0];
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log('🛡️ Middleware running...');
  console.log('🌐 Full Pathname:', pathname);

  const locale = getLocale(pathname, routing.locales);
  const cleanPath = stripLocale(pathname, routing.locales);

  const isProtected = PROTECTED_PATHS.some(path => cleanPath.startsWith(path));
  const isAuthOnlyPage = PUBLIC_AUTH_ONLY_PATHS.includes(cleanPath);

  const token = req.cookies.get('auth_token')?.value;
  const payload = token && await verifyJwt(token);

  // ✅ Nếu là trang auth và user đã login => redirect ra dashboard
  if (isAuthOnlyPage && payload) {
    console.log('🚪 User đã login nhưng đang vào trang auth => Redirect');
    const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // ✅ Nếu là trang protected nhưng chưa login => redirect ra login
  if (isProtected && !payload) {
    console.log('🚫 Unauthorized. Redirecting to login.');
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ i18n xử lý cuối cùng
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Exclude static files, _next, _vercel, and /api/*
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};

