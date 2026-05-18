import type { Metadata } from 'next'
import { Cormorant_Garamond, Open_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { Toaster } from '@/components/ui/sonner'
import { getSiteUrl, SITE } from '@/lib/seo/site'

const openSans = Open_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.defaultDescription,
  keywords: ['CHẠM Bloom', 'game hóa', 'môi trường', 'Gen Z', 'tài trợ', 'Flow & Flora'],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.defaultDescription,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
      </head>
      <body
        className={`${openSans.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <Toaster position="bottom-center" richColors closeButton />
        </Providers>
      </body>
    </html>
  )
}
