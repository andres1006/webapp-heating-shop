import ComfortSolutionSection from './comfortSolutionSection'
import WhyChooseUsSection from './whyChooseUsSection'
import TestimonialsSection from './testimonialsSection'
import Link from 'next/link'
import Script from 'next/script'

export default function HomePage() {
  // Datos estructurados JSON-LD para mejorar el SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Freddo - Instalación de Aire Acondicionado',
    image: 'https://www.freddoair.com/assets/logo.png',
    url: 'https://www.freddoair.com',
    telephone: '+52-55-1234-5678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Principal 123',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      postalCode: '01000',
      addressCountry: 'MX'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.4326,
      longitude: -99.1332
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00'
      }
    ],
    sameAs: ['https://www.facebook.com/freddoac', 'https://www.instagram.com/freddoac', 'https://twitter.com/freddoac'],
    priceRange: '$$',
    servesCuisine: 'Instalación de Aire Acondicionado',
    description:
      'Servicio profesional de instalación de aire acondicionado en México. Soluciones de climatización para hogares y oficinas con garantía y servicio técnico especializado.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      price: '11999',
      availability: 'https://schema.org/InStock',
      validFrom: '2023-01-01',
      url: 'https://freddoair.com/configurador'
    }
  }

  return (
    <>
      {/* Datos estructurados JSON-LD para SEO */}
      <Script
        id="json-ld-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Secciones de la página de inicio */}
      <ComfortSolutionSection />
      <WhyChooseUsSection />
      <TestimonialsSection />

      {/* Botón de llamada a la acción */}
      <div className="flex justify-center items-center my-10">
        <Link
          href="/configurador"
          className="px-6 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 text-lg font-medium shadow-md"
        >
          Contrata ahora
        </Link>
      </div>
    </>
  )
}
