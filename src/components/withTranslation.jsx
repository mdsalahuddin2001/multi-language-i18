'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'

export function withTranslation(Component) {
  return function WrappedComponent(props) {
    const { t, i18n } = useClientTranslation()

    return <Component {...props} t={t} i18n={i18n} />
  }
}
