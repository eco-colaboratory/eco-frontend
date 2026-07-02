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
  ogImage = SITE.gameThumbnail.url,
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
      images: [
        {
          url: ogImage,
          width: SITE.gameThumbnail.width,
          height: SITE.gameThumbnail.height,
          alt: SITE.gameThumbnail.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
  }
}
