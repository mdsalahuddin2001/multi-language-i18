import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

export const initTranslations = async (locale, namespaces) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language, namespace) =>
        import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init({
      lng: locale,
      fallbackLng: 'en',
      supportedLngs: ['en', 'bn'],
      defaultNS: 'translation',
      fallbackNS: 'translation',
      ns: namespaces,
      interpolation: {
        escapeValue: false,
      },
    })

  return i18nInstance
}
