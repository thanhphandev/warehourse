import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware({
  // A list of all locales that are supported
  locales: routing.locales,
  
  // Used when no locale matches
  defaultLocale: routing.defaultLocale,
  
  // Locale detection for automatic redirection
  localeDetection: true,
  
  // Redirect paths with trailing slashes
  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except for
  // - Files with extensions (e.g., static files like images)
  // - API routes
  // - _next paths (Next.js internals)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
