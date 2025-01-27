'use server'

import { cookies } from 'next/headers'

export async function setLocation(location) {
  // Validate location
  const validLocations = ['dhaka', 'chittagong']
  if (!validLocations.includes(location)) {
    throw new Error('Invalid location')
  }

  // Set the cookie
  cookies().set('NEXT_LOCATION', location, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  return location
}
