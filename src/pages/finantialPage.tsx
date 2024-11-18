'use client'

import React from 'react'
import Link from 'next/link'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'
import { Card } from '@/components/ui/card'

const FinantialPage = () => {
  return (
    <main className="w-full mx-auto">
      {/* Sección del Proceso de Financiamiento */}
      <section className="pt-16 bg-blue-50/30 p-4 ">
        <div className="container mx-auto px-4 pt-8">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Proceso de Financiamiento
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              En 3 simples y sencillos pasos, podrás financiar tu aire acondicionado.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            {/* Proceso Pasos */}
            <div className="md:w-1/2">
              <ol className="relative border-s border-gray-200 dark:border-gray-700">
                <li className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Selecciona tu Producto</h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Elige el sistema de aire acondicionado que mejor se adapte a tus necesidades.
                  </p>
                </li>
                <li className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completa el Formulario</h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Rellena nuestros datos de contacto y detalles de financiamiento.
                  </p>
                </li>
                <li className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aprobar Financiación</h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Revisamos tu solicitud y te notificamos sobre la aprobación de tu financiamiento.
                  </p>
                </li>
                <li className="ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instalación y Mantenimiento</h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Programamos la instalación y ofrecemos mantenimiento periódico sin costo adicional.
                  </p>
                </li>
              </ol>
            </div>
            {/* Imagen Representativa */}
            <Card className="w-full md:w-1/2 mt-8 p-4">
              <FinancingSimulator />
              <Link href="/configurador">
                <p className="bg-blue-200 mt-2 text-white text-center px-6 py-3 rounded-md hover:bg-blue-300 transition truncate">
                  Comprar
                </p>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección de Contacto y Botón de Compra */}
      <section className="w-full pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            {/* Formulario de Contacto */}
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-3xl font-bold mb-6">Contáctanos</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu Nombre"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tuemail@ejemplo.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu Mensaje"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-200 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
            {/* Botón de Acción para Comprar */}
            <div className="md:w-1/2 mt-8 md:mt-0 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Descubre la comodidad de un ambiente fresco con solo un clic. ¡Empieza ahora!
              </h2>
              <h3 className="text-xl font-normal mb-6">
                No esperes más, ¡Comienza a disfrutar de un ambiente fresco hoy!
              </h3>
              <Link href="/configurador">
                <p className="bg-blue-200 text-white text-center px-6 py-3 rounded-md hover:bg-blue-300 transition truncate">
                  Comprar
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FinantialPage
