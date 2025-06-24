import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';

const intlMiddleware = createMiddleware(routing);
const PROTECTED_PATHS = ['/profile', '/orders'];
const ADMIN_PATHS = ['/dashboard'];
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

  const locale = getLocale(pathname, routing.locales);
  const cleanPath = stripLocale(pathname, routing.locales);

  const isProtected = PROTECTED_PATHS.some(path => cleanPath.startsWith(path));
  const isAuthOnlyPage = PUBLIC_AUTH_ONLY_PATHS.includes(cleanPath);
  const isAdminPage = ADMIN_PATHS.some(path => cleanPath.startsWith(path));

  const token = req.cookies.get('auth_token')?.value;
  const payload = token && await verifyJwt(token);

  if (isAuthOnlyPage && payload) {
    const dashboardUrl = new URL(`/${locale}`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (isAdminPage && (!payload || payload.role !== "admin")) {
    const forbiddenUrl = new URL(`/${locale}`, req.url);
    return NextResponse.redirect(forbiddenUrl);
  }

  if (isProtected && !payload) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Exclude static files, _next, _vercel, and /api/*
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};

