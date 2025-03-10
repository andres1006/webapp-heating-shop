import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SidebarWrapper from '@/components/SidebarWrapper'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.freddo.mx'),
  title: {
    template: '%s | Freddo - Instalación de Aire Acondicionado',
    default: 'Freddo - Instalación de Aire Acondicionado en México'
  },
  description:
    'Servicio profesional de instalación de aire acondicionado en México. Soluciones de climatización para hogares y oficinas.',
  applicationName: 'Freddo',
  authors: [{ name: 'Freddo', url: 'https://www.freddo.mx' }],
  generator: 'Next.js',
  keywords: ['aire acondicionado', 'instalación', 'climatización', 'México', 'confort térmico'],
  referrer: 'origin-when-cross-origin',
  creator: 'Freddo',
  publisher: 'Freddo',
  formatDetection: {
    email: true,
    address: true,
    telephone: true
  },
  icons: {
    icon: '/assets/icon.png',
    apple: '/assets/icon.png'
  },
  category: 'home improvement'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preload" as="image" href="/assets/logo-horizontal.png" />
      </head>
      <body className={inter.className}>
        <SidebarWrapper>{children}</SidebarWrapper>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#000'
            },
            success: {
              duration: 3000,
              style: {
                background: '#22c55e',
                color: '#fff'
              }
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
                color: '#fff'
              }
            }
          }}
        />
      </body>
    </html>
  )
}
