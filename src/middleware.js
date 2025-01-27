import { NextResponse } from 'next/server'

const locales = ['en', 'bn']
const locations = ['dhaka', 'chittagong']
const defaultLocale = 'en'
const defaultLocation = 'dhaka'

// Get the locale from cookie or default
function getLocale(request) {
  // First check NEXT_LOCALE cookie
  const nextLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (nextLocale && locales.includes(nextLocale)) {
    return nextLocale
  }

  // Then check language cookie (fallback)
  const langLocale = request.cookies.get('language')?.value
  if (langLocale && locales.includes(langLocale)) {
    return langLocale
  }

  // Finally check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase()

    if (locales.includes(preferredLocale)) {
      return preferredLocale
    }
  }

  return defaultLocale
}
// Get the locale from cookie or default
function getLocation(request) {
  // First check NEXT_LOCALE cookie
  const nextLocation = request.cookies.get('NEXT_LOCATION')?.value
  if (nextLocation && locations.includes(nextLocation)) {
    return nextLocation
  }

  // Then check language cookie (fallback)

  // Finally check Accept-Language header
  const acceptLocation = request.headers.get('accept-location')
  if (acceptLocation) {
    const preferredLocation = acceptLocation
      .split(',')[0]
      .split('-')[0]
      .toLowerCase()

    if (locations.includes(preferredLocation)) {
      return preferredLocation
    }
  }

  return defaultLocation
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip if pathname already has correct format: /locale/location/...
  const hasCorrectFormat = locales.some((locale) =>
    locations.some(
      (location) =>
        pathname.startsWith(`/${locale}/${location}/`) ||
        pathname === `/${locale}/${location}` ||
        (pathname.includes(`/${locale}`) && pathname.includes(`/${location}`))
    )
  )

  if (hasCorrectFormat) {
    return NextResponse.next() // Allow request to proceed
  }

  // Check if the pathname starts with any locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  const pathnameIsMissingLocation = locations.every(
    (location) =>
      !pathname.startsWith(`/${location}`) && pathname !== `/${location}`
  )

  if (pathnameIsMissingLocale && pathnameIsMissingLocation) {
    const locale = getLocale(request)
    const location = getLocation(request)
    return NextResponse.redirect(
      new URL(`/${locale}/${location}${pathname}`, request.url)
    )
  } else if (pathnameIsMissingLocale && !pathnameIsMissingLocation) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  } else if (!pathnameIsMissingLocale && pathnameIsMissingLocation) {
    const location = getLocation(request)
    return NextResponse.redirect(
      new URL(`${pathname}/${location}`, request.url)
    )
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
