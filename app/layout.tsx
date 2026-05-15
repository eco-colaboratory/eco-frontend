import type { Metadata } from 'next'
import { Open_Sans, Quicksand } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { Toaster } from '@/components/ui/sonner'

const openSans = Open_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const quicksand = Quicksand({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Eco Learning - Your Educational Platform',
  description: 'A complete educational platform for learning and growth.',
  keywords: ['learning', 'education', 'eco', 'online courses'],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Eco Learning',
    description: 'A complete educational platform for learning and growth.',
    siteName: 'Eco Learning',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${openSans.variable} ${quicksand.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster position="bottom-center" richColors closeButton />
        </Providers>
      </body>
    </html>
  )
}
