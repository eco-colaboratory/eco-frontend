import type { Metadata } from 'next'
import { Inter, Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { Toaster } from '@/components/ui/sonner'
import { getSiteUrl, SITE } from '@/lib/seo/site'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-be-vietnam-pro',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.defaultDescription,
  keywords: ['CHẠM Flora', 'game hóa', 'môi trường', 'Gen Z', 'tài trợ', 'Flow & Flora'],
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
        className={`${beVietnamPro.variable} ${inter.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <Toaster position="bottom-center" richColors closeButton />
        </Providers>
      </body>
    </html>
  )
}
