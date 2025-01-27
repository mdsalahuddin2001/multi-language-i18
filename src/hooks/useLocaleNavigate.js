'use client'

import { useParams } from 'next/navigation'

export function useLocaleNavigate() {
  const params = useParams()

  const getLocalizedPath = (path) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `/${params.locale}/${cleanPath}`
  }

  return { getLocalizedPath }
}
