import { initTranslations } from '@/i18n/server'

const data = {
  dhaka: {
    title_en: 'Dhaka',
    title_bn: 'ঢাকা',
    description_en: 'Dhaka is the capital city of Bangladesh.',
    description_bn: 'ঢাকা বাংলাদেশের প্রাদেশিক শহর।',
  },
  chittagong: {
    title_en: 'Chittagong',
    title_bn: 'চট্টগ্রাম',
    description_en: 'Chittagong is the second largest city of Bangladesh.',
    description_bn: 'চট্টগ্রাম বাংলাদেশের দ্বিতীয় বড় শহর।',
  },
}
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
      <h1 className='text-3xl font-bold'>
        {
          data[params.location]?.[
            params.locale === 'en' ? 'title_en' : 'title_bn'
          ]
        }
      </h1>
      <p>
        {
          data[params.location]?.[
            params.locale === 'en' ? 'description_en' : 'description_bn'
          ]
        }
      </p>
    </div>
  )
}
