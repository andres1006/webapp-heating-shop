'use client'

import { FaTools, FaSyncAlt, FaBolt, FaHandHoldingUsd } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'

interface Service {
  title: string
  description: string
  icon: JSX.Element
}

const services: Service[] = [
  {
    title: 'Instalación sin Estrés',
    description:
      'Nos encargamos de la instalación completa de tu sistema de aire acondicionado, asegurando un funcionamiento óptimo desde el primer día.',
    icon: <FaTools size={40} color="#4A90E2" />
  },
  {
    title: 'Mantenimiento Periódico',
    description:
      'Ofrecemos planes de mantenimiento cada 12 meses para garantizar que tu equipo funcione de manera eficiente y prolongar su vida útil.',
    icon: <FaSyncAlt size={40} color="#4A90E2" />
  },
  {
    title: 'Reparaciones Rápidas',
    description:
      'Nuestro equipo de expertos está disponible para resolver cualquier problema que pueda surgir con tu aire acondicionado de manera rápida y efectiva.',
    icon: <FaBolt size={40} color="#4A90E2" />
  },
  {
    title: 'Asesoría Personalizada',
    description:
      'Te ayudamos a elegir el sistema de aire acondicionado que mejor se adapte a tus necesidades y al espacio de tu hogar o negocio.',
    icon: <FaHandHoldingUsd size={40} color="#4A90E2" />
  }
]

const ServicesPage = () => {
  return (
    <main className="mx-auto ">
      {/* Sección de Servicios */}
      <section className="bg-blue-50/50 py-16">
        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Nuestros Servicios
        </h1>
        <p className="mb-6 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Ofrecemos instalación sin estrés y mantenimiento periódico para garantizar que tu aire acondicionado funcione
          de manera óptima.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-[10%]">
          {services.map((service, index) => (
            <Link href="/configurador">
              <div
                key={index}
                className="bg-white min-h-[280px] rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Link>
          ))}
          <Link href="/configurador" className="md:hidden">
            <p className="bg-blue-200 text-white text-center px-6 py-3 rounded-md hover:bg-blue-200 transition truncate">
              Comprar
            </p>
          </Link>
        </div>
      </section>

      {/* Sección Adicional Opcional: ¿Por Qué Elegirnos? */}
      <section className="mt-16 px-[10%]">
        <h2 className="text-center text-2xl md:text-4xl font-extrabold dark:text-white mb-5">¿Por Qué Elegirnos?</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="flex flex-col md:flex-row items-center">
            <Image
              src="/assets/certified-experts.png"
              alt="Expertos Certificados"
              width={100}
              height={100}
              className="w-16 h-16 mr-4"
            />
            <div>
              <h4 className="text-lg font-medium mb-2">Expertos Certificados</h4>
              <p className="text-gray-600">
                Contamos con técnicos altamente capacitados y certificados para ofrecer el mejor servicio.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <Image
              src="/assets/quick-response.png"
              alt="Respuesta Rápida"
              width={100}
              height={100}
              className="w-16 h-16 mr-4"
            />
            <div>
              <h4 className="text-lg font-medium">Respuesta Rápida</h4>
              <p className="text-gray-600">Nos aseguramos de atender tus solicitudes de manera rápida y eficiente.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <Image
              src="/assets/affordable-prices.png"
              alt="Precios Asequibles"
              width={100}
              height={100}
              className="w-16 h-16 mr-4"
            />
            <div>
              <h4 className="text-lg font-medium">Precios Asequibles</h4>
              <p className="text-gray-600">Ofrecemos servicios de alta calidad a precios competitivos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Compra */}
      <section className="py-6 bg-blue-50/50 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Compra Ahora y Disfruta del Confort de{' '}
            <span className="text-blue-600 dark:text-blue-500">Aire Fresco </span> en Minutos.
          </h1>
          {/* Descripción del Servicio */}
          <p className="text-md md:text-lg md:text-center mb-12">
            Con solo unos clics, programa la instalación y disfruta de un mantenimiento periódico. Nos encargamos de
            todo.
          </p>
          {/* Opciones de Pago */}
          <div className="flex justify-center space-x-4">
            <Link href="/configurador">
              <p className="bg-blue-200 text-white text-center px-6 py-3 rounded-md hover:bg-blue-300 transition truncate">
                Comprar
              </p>
            </Link>
            <Link href="/configurador">
              <p className="bg-blue-400 text-white text-center px-6 py-3 rounded-md hover:bg-blue-400 transition truncate">
                Financiar
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Financiamiento */}
      <section className="pt-8 bg-white mt-8">
        <div className="mx-auto ">
          {/* Encabezado de Financiamiento */}
          <h2 className="text-3xl font-semibold text-center mb-8">Pago Flexible, Frescura Garantizada</h2>
          {/* Texto de Financiamiento */}
          <p className="text-lg text-center mb-12">
            Compra ahora y elige cómo pagar. Nuestras opciones de financiamiento son rápidas y sin complicaciones para
            que tengas el control de tu presupuesto.
          </p>
          {/* Simulador de Cuotas */}
          <section className="w-full md:w-[75%] mx-auto bg-blue-100/5 p-6 rounded-lg">
            <FinancingSimulator showHide={true} />
          </section>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
