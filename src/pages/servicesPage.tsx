'use client'

import React, { useState } from 'react'
import { FaTools, FaSyncAlt, FaBolt, FaHandHoldingUsd } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

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
      'Ofrecemos planes de mantenimiento cada 6 meses para garantizar que tu equipo funcione de manera eficiente y prolongar su vida útil.',
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
  // Estado para el simulador de cuotas
  const [monto, setMonto] = useState<number>(0)
  const [cuotas, setCuotas] = useState<number>(0)
  const [resultado, setResultado] = useState<number | null>(null)

  const calcularCuota = () => {
    if (monto > 0 && cuotas > 0) {
      const cuotaMensual = monto / cuotas
      setResultado(cuotaMensual)
    }
  }

  return (
    <main className="mx-auto py-4 mt-16">
      {/* Encabezado de Servicios */}

      {/* Sección de Servicios */}
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Nuestros Servicios
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Ofrecemos instalación sin estrés y mantenimiento periódico para garantizar que tu aire acondicionado funcione de
        manera óptima.
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-[10%]">
        {services.map((service, index) => (
          <Link href="/configurador">
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Sección Adicional Opcional: ¿Por Qué Elegirnos? */}
      <section className="mt-16 px-[10%]">
        <h2 className="text-center text-4xl font-extrabold dark:text-white mb-5">¿Por Qué Elegirnos?</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="flex items-center">
            <Image
              src="/assets/certified-experts.png"
              alt="Expertos Certificados"
              width={64}
              height={64}
              className="w-16 h-16 mr-4"
            />
            <div>
              <h4 className="text-lg font-medium">Expertos Certificados</h4>
              <p className="text-gray-600">
                Contamos con técnicos altamente capacitados y certificados para ofrecer el mejor servicio.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/quick-response.png"
              alt="Respuesta Rápida"
              width={64}
              height={64}
              className="w-16 h-16 mr-4"
            />
            <div>
              <h4 className="text-lg font-medium">Respuesta Rápida</h4>
              <p className="text-gray-600">Nos aseguramos de atender tus solicitudes de manera rápida y eficiente.</p>
            </div>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/affordable-prices.png"
              alt="Precios Asequibles"
              width={64}
              height={64}
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
      <section className="px-[10%] py-6 bg-blue-50/50 mt-16">
        <div className="container mx-auto px-4">
          {/* Encabezado de Compra */}
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Compra Ahora y Disfruta del Confort de{' '}
            <span className="text-blue-600 dark:text-blue-500">Aire Fresco </span> en Minutos.
          </h1>
          {/* Descripción del Servicio */}
          <p className="text-lg text-center mb-12">
            Con solo unos clics, programa la instalación y disfruta de un mantenimiento periódico. Nos encargamos de
            todo.
          </p>
          {/* Opciones de Pago */}
          <div className="flex justify-center space-x-4">
            <Link href="/comprar-contado">
              <p className="bg-blue-400 text-white px-6 py-3 rounded-md hover:bg-blue-400 transition">
                Comprar al Contado
              </p>
            </Link>
            <Link href="/financiar">
              <p className="bg-blue-200 text-white px-6 py-3 rounded-md hover:bg-blue-400 transition">Financiar</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Financiamiento */}
      <section className="py-16 bg-white mt-16">
        <div className="mx-auto ">
          {/* Encabezado de Financiamiento */}
          <h2 className="text-3xl font-semibold text-center mb-8">Pago Flexible, Frescura Garantizada</h2>
          {/* Texto de Financiamiento */}
          <p className="text-lg text-center mb-12">
            Compra ahora y elige cómo pagar. Nuestras opciones de financiamiento son rápidas y sin complicaciones para
            que tengas el control de tu presupuesto.
          </p>
          {/* Simulador de Cuotas */}
          <section className="w-full mx-auto bg-blue-100/5 p-6 rounded-lg px-[30%]">
            <h3 className="text-2xl font-semibold mb-4 text-center">Simulador de Cuotas</h3>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="monto">
                Monto a Financiar
              </label>
              <input
                type="number"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingresa el monto"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="cuotas">
                Número de Cuotas
              </label>
              <input
                type="number"
                id="cuotas"
                value={cuotas}
                onChange={(e) => setCuotas(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingresa las cuotas"
              />
            </div>
            <button
              onClick={calcularCuota}
              className="w-full bg-blue-200 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition"
            >
              Calcula tu Pago Mensual
            </button>

            {resultado !== null && (
              <div className="mt-6 p-4 bg-blue-100 border border-blue-200 rounded-md">
                <p className="text-blue-700">
                  Tu pago mensual es: <strong>${resultado.toFixed(2)}</strong>
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
