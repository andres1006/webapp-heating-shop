'use client'

import React, { useState } from 'react'
import { FaTools, FaSyncAlt, FaBolt } from 'react-icons/fa'

const benefits = [
  {
    title: 'Instalación Incluida',
    description:
      'Nosotros nos encargamos de que tu habitación permanezca fría en esta temporada de calor, tú solo relájate.',
    icon: <FaTools size={40} />,
    image: '/assets/img-3.png'
  },
  {
    title: 'Mantenimiento Cada 12 Meses',
    description: 'Olvídate de programaciones, nosotros te contactamos.',
    icon: <FaSyncAlt size={40} />,
    image: '/assets/img-4.png'
  },
  {
    title: 'Proceso rápido y sencillo',
    description: 'Contrata en minutos con un proceso 100% digital.',
    icon: <FaBolt size={40} />,
    image: '/assets/img-5.png'
  }
]

const WhyChooseUsSection = () => {
  return (
    <section className="py-8 px-6 bg-white ease-out">
      <h2 className="text-3xl font-bold text-center mb-10">Más que un Aire Acondicionado, un Servicio Completo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ease-out">
        {benefits.map((benefit, index) => (
          <div key={index} className="relative">
            {/* Card */}
            <div
              className={`relative h-64 rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 `}
            >
              <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white p-4">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm">{benefit.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUsSection
