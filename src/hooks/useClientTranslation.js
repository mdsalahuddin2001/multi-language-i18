'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import i18next from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language, namespace) =>
      import(`@/i18n/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    supportedLngs: ['en', 'bn'],
    defaultNS: 'translation',
    fallbackNS: 'translation',
  })

export function useClientTranslation() {
  const params = useParams()
  const { t, i18n } = useTranslation()
  const locale = params?.locale || 'en'

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return { t, i18n }
}
