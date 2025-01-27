'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (language) => {
    // Get the current path segments
    const segments = pathname.split('/')
    // Replace the language segment (index 1)
    segments[1] = language
    // Construct new path
    const newPath = segments.join('/')

    i18n.changeLanguage(language)
    router.push(newPath)
  }

  return (
    <div className='flex gap-4'>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        {t('common.english')}
      </button>
      <button
        onClick={() => changeLanguage('bn')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'bn' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        {t('common.bengali')}
      </button>
    </div>
  )
}
