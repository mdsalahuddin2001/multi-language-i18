'use client'

import { usePathname, useRouter } from 'next/navigation'
import { setLocation } from '@/actions/setLocation'

export default function ClientLocationSwitcher({ location }) {
  const pathname = usePathname()
  const router = useRouter()
  const changeLocation = async (newLocation) => {
    if (newLocation === location) return

    // Get the current locale and rest of the path
    const pathParts = pathname.split('/')
    const currentLocale = pathParts[1]
    const pathAfterLocation = pathParts.slice(3).join('/')
    const path = pathAfterLocation ? `/${pathAfterLocation}` : ''

    try {
      // Call server action to set cookie
      await setLocation(newLocation)

      // Store in localStorage as backup
      localStorage.setItem('location', newLocation)

      // Construct the new URL
      const newUrl = `/${currentLocale}/${newLocation}${path}`

      // Do a full page reload
      // window.location.href = newUrl
      router.push(newUrl)
    } catch (error) {
      console.error('Failed to set location:', error)
    }
  }

  return (
    <div className='flex gap-4'>
      <button
        onClick={() => changeLocation('dhaka')}
        className={`px-3 py-1 rounded ${
          location === 'dhaka' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Dhaka
      </button>
      <button
        onClick={() => changeLocation('chittagong')}
        className={`px-3 py-1 rounded ${
          location === 'chittagong' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Chittagong
      </button>
    </div>
  )
}
