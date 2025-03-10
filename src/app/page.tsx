import Carousel from '@/components/carrusel'
import React from 'react'
import HomePage from './home/page'
import type { Metadata } from 'next'

// Metadatos para SEO optimizados para campañas
export const metadata: Metadata = {
  title: 'FreddoAir | Instalación de Aire Acondicionado en México',
  description:
    'Servicio profesional de instalación de aire acondicionado en México. Soluciones de climatización para hogares y oficinas con garantía y servicio técnico especializado.',
  keywords:
    'aire acondicionado, instalación, climatización, México, servicio técnico, confort térmico, eficiencia energética',
  openGraph: {
    title: 'FreddoAir | Instalación de Aire Acondicionado en México',
    description:
      'Servicio profesional de instalación de aire acondicionado en México. Soluciones de climatización para hogares y oficinas con garantía y servicio técnico especializado.',
    url: 'https://www.freddoair.com',
    siteName: 'FreddoAir',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Freddo - Instalación de Aire Acondicionado'
      }
    ],
    locale: 'es_MX',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freddo | Instalación de Aire Acondicionado en México',
    description:
      'Servicio profesional de instalación de aire acondicionado en México. Soluciones de climatización para hogares y oficinas.',
    images: ['/assets/og-image.jpg']
  },
  alternates: {
    canonical: 'https://freddoair.com/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'verificación-google',
    yandex: 'verificación-yandex',
    yahoo: 'verificación-yahoo'
  }
}

// Componente de la página de inicio
const Page = () => {
  return (
    <div className="flex flex-col h-full">
      <Carousel />
      <section className="w-full flex-1 overflow-auto">
        <HomePage />
      </section>
    </div>
  )
}

export default Page
