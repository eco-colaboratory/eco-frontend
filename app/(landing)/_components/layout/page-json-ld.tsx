import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { getSiteUrlFromRequest } from '@/lib/seo/request-site-url'
import { SITE } from '@/lib/seo/site'

export async function PageJsonLd() {
  const siteUrl = await getSiteUrlFromRequest()
  const { contact } = CHAM_BLOOM_CONTENT

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: SITE.name,
        url: siteUrl,
        description: SITE.defaultDescription,
        sameAs: [contact.facebookUrl],
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=512&q=80',
        },
      },
    ],
  }

  const safeJson = JSON.stringify(jsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson }} />
  )
}
