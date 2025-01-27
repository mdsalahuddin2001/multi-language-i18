import ClientLanguageSwitcher from '@/components/ClientLanguageSwitcher'
import { redirect } from 'next/navigation'
import React from 'react'
import { initTranslations } from '@/i18n/server'
import ClientLocationSwitcher from '@/components/ClientLocationSwitcher'
import Link from 'next/link'
async function getTranslations(locale) {
  const i18nInstance = await initTranslations(locale, ['translation'])
  return {
    t: i18nInstance.getFixedT(locale, 'translation'),
  }
}
const LocationLayout = async ({ children, params }) => {
  const { location, locale } = params
  const { t } = await getTranslations(params.locale)
  console.log('location', location)
  if (location !== 'dhaka' && location !== 'chittagong') {
    redirect(`/${locale}`)
  }

  return (
    <>
      {' '}
      <header className='p-4 bg-gray-100'>
        <nav className='flex justify-between items-center max-w-4xl mx-auto'>
          <div className='flex items-center gap-2'>
            <Link
              href={`/${params.locale}/${params.location}`}
              className='text-xl font-bold'
            >
              {t('common.welcome')}
            </Link>
            <Link
              href={`/${params.locale}/${params.location}/about`}
              className='text-blue-500 hover:underline'
            >
              {t('navigation.about')}
            </Link>
          </div>
          <div className='flex  gap-2 items-stretch'>
            <ClientLanguageSwitcher locale={params.locale} />
            <div className='h-10 w-1 bg-emerald-500'></div>
            <ClientLocationSwitcher location={params.location} />
          </div>
        </nav>
      </header>
      <main className='max-w-4xl mx-auto p-4'>{children}</main>
    </>
  )
}

export default LocationLayout
