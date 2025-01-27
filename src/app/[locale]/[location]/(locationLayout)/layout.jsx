import { redirect } from 'next/navigation'
import React from 'react'

const LocationLayout = ({ children, params }) => {
  const { location, locale } = params
  console.log('location', location)
  if (location !== 'dhaka' && location !== 'chittagong') {
    redirect(`/${locale}`)
  }

  return <>{children}</>
}

export default LocationLayout
