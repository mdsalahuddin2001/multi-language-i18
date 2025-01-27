'use client'

import { useTranslation as useTranslationBase } from 'react-i18next'
import { useParams } from 'next/navigation'

export function useTranslation() {
  const params = useParams()
  const { i18n, t } = useTranslationBase()

  const locale = params?.locale
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale)
  }

  return { t, i18n }
}
