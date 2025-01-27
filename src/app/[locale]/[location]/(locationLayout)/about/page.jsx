import { initTranslations } from '@/i18n/server'

async function getTranslations(locale) {
  const i18nInstance = await initTranslations(locale, ['translation'])
  return {
    t: i18nInstance.getFixedT(locale, 'translation'),
  }
}

export default async function AboutPage({ params }) {
  const { t } = await getTranslations(params.locale)

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>{t('navigation.about')}</h1>
      <p className='text-lg'>{t('about.description')}</p>
    </div>
  )
}
