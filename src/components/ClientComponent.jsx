'use client'

import { withTranslation } from '@/components/withTranslation'
import { useLocaleNavigate } from '@/hooks/useLocaleNavigate'
import Link from 'next/link'

function ClientComponent({ t, data }) {
  const { getLocalizedPath } = useLocaleNavigate()

  return (
    <div>
      <h2>{t('client.title')}</h2>
      <p>{t('client.description')}</p>
      <Link
        href={getLocalizedPath('about')}
        className='text-blue-500 hover:underline'
      >
        {t('navigation.about')}
      </Link>
    </div>
  )
}

export default withTranslation(ClientComponent)
