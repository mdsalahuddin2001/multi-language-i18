'use server'

import { cookies } from 'next/headers'

export async function setLanguage(locale) {
  // Set cookie with a 1-year expiry
  cookies().set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
  })
}
