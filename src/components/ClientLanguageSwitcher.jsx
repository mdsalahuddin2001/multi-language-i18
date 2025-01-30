'use client'

import { usePathname, useRouter } from 'next/navigation'
import { setLanguage } from '@/actions/setLanguage'

export default function ClientLanguageSwitcher({ locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const changeLanguage = async (newLocale) => {
    if (newLocale === locale) return

    // Get the path without the locale
    const newPathname = pathname.replace(`/${locale}`, '')
    const path = newPathname || '/'

    try {
      // Call server action to set cookie
      await setLanguage(newLocale)

      // Store in localStorage as backup
      localStorage.setItem('language', newLocale)

      // Construct the new URL
      const newUrl = `/${newLocale}${path}`

      // Do a full page reload
      // window.location.href = newUrl
      router.push(newUrl)
    } catch (error) {
      console.error('Failed to set language:', error)
    }
  }

  return (
    <div className='flex gap-4'>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('bn')}
        className={`px-3 py-1 rounded ${
          locale === 'bn' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        বাংলা
      </button>
    </div>
  )
}
