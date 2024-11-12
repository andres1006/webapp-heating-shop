'use client'

import React from 'react';

const testimonials = [
  {
    quote: "Excelente servicio, fue muy fácil hacer la compra y el equipo llegó con instalación incluida. ¡Súper recomendado!",
    name: "Juan Pérez",
    avatar: '/assets/avatars/juan_perez.jpg'
  },
  {
    quote: "Muy práctico y rápido, además de contar con mantenimiento periódico sin preocuparme.",
    name: "María López",
    avatar: '/assets/avatars/maria_lopez.jpg'
  },
  {
    quote: "Muy práctico y rápido, además de contar con mantenimiento periódico sin preocuparme.",
    name: "María López",
    avatar: '/assets/avatars/maria_lopez.jpg'
  },
  {
    quote: "Muy práctico y rápido, además de contar con mantenimiento periódico sin preocuparme.",
    name: "María López",
    avatar: '/assets/avatars/maria_lopez.jpg'
  },
  // Agrega más testimonios según sea necesario
];

const TestimonialsSection = () => (
  <section className="py-16 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-10">Opiniones de clientes</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 fade-in-up flex items-center space-x-4"
        >
          {/* Avatar */}
          <img
            src={testimonial.avatar}
            alt={`Avatar de ${testimonial.name}`}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />

          {/* Texto del Testimonio */}
          <div>
            <p className="text-gray-800 italic">"{testimonial.quote}"</p>
            <footer className="mt-4 text-gray-600 font-semibold">- {testimonial.name}</footer>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;