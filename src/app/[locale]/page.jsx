import { initTranslations } from '@/i18n/server'
import Link from 'next/link'

async function getTranslations(locale) {
  const i18nInstance = await initTranslations(locale, ['translation'])
  return {
    t: i18nInstance.getFixedT(locale, 'translation'),
  }
}

export default async function HomePage({ params }) {
  const { t } = await getTranslations(params.locale)

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>{t('home.title')}</h1>
      <p className='text-lg'>{t('home.description')}</p>

      <nav className='flex items-center gap-3'>
        <Link
          href={`/${params.locale}/dhaka`}
          className='text-blue-500 hover:underline'
        >
          {t('navigation.dhaka')}
        </Link>
        <Link
          href={`/${params.locale}/chittagong`}
          className='text-blue-500 hover:underline'
        >
          {t('navigation.chittagong')}
        </Link>
      </nav>
    </div>
  )
}
