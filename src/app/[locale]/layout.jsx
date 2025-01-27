import { initTranslations } from '@/i18n/server'
import ClientLanguageSwitcher from '@/components/ClientLanguageSwitcher'
import '@/app/globals.css'
async function getTranslations(locale) {
  const i18nInstance = await initTranslations(locale, ['translation'])
  return {
    t: i18nInstance.getFixedT(locale, 'translation'),
  }
}

export default async function RootLayout({ children, params }) {
  const { t } = await getTranslations(params.locale)

  return (
    <html lang={params.locale}>
      <body>
        <header className='p-4 bg-gray-100'>
          <nav className='flex justify-between items-center max-w-4xl mx-auto'>
            <h1 className='text-xl font-bold'>{t('common.welcome')}</h1>
            <ClientLanguageSwitcher locale={params.locale} />
          </nav>
        </header>
        <main className='max-w-4xl mx-auto p-4'>{children}</main>
      </body>
    </html>
  )
}
