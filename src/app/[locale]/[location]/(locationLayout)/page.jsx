import { initTranslations } from '@/i18n/server'
import React from 'react'

async function getTranslations(locale) {
  const i18nInstance = await initTranslations(locale, ['translation'])
  return {
    t: i18nInstance.getFixedT(locale, 'translation'),
  }
}

const MainPage = async ({ params }) => {
  const { t } = await getTranslations(params.locale)

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
      <h1 className='text-4xl'>
        {params.location === 'dhaka'
          ? params?.locale === 'en'
            ? 'Dhaka'
            : 'ঢাকা'
          : params?.locale === 'en'
          ? 'Chittagang'
          : 'চটগ্রাম'}
      </h1>
    </div>
  )
}

export default MainPage
