import type { Metadata } from 'next'
import { getSiteUrl, SITE } from './site'

type BuildPageMetadataInput = {
  title: string
  description?: string
  path?: string
  noindex?: boolean
  ogImage?: string
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function buildPageMetadata({
  title,
  description = SITE.defaultDescription,
  path = '/',
  noindex = false,
  ogImage = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&h=630&q=80',
}: BuildPageMetadataInput): Metadata {
  const siteUrl = getSiteUrl()
  const pathname = normalizePath(path)
  const canonical = `${siteUrl}${pathname}`
  const ogTitle = title.includes(SITE.shortName) ? title : `${title} | ${SITE.shortName}`

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url: canonical,
      title: ogTitle,
      description,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
  }
}
