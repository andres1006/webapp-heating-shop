'use client'
import { useEffect, useState } from 'react';

const features = [
  {
    title: 'Eficiencia Energética',
    description: 'Nuestros equipos ofrecen alta eficiencia energética, ayudándote a ahorrar en tus facturas de electricidad.',
    icon: '💡'
  },
  {
    title: 'Instalación Profesional',
    description: 'Nuestro equipo de técnicos asegura una instalación rápida y segura para tu comodidad.',
    icon: '🔧'
  },
  {
    title: 'Personalización Completa',
    description: 'Elige el tamaño y el estilo que mejor se adapten a tus necesidades y espacio.',
    icon: '🎨'
  }
];

export default function FeaturesSection() {
  // Controlar el estado para activar la animación al hacer scroll
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('features');
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight - 100); // Activa la animación antes de que entre a la vista
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="features" className="py-16 bg-gray-50 text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">Características</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 bg-white rounded-xl shadow-lg text-center transform transition duration-500 ease-out ${isVisible ? 'fade-in-up' : 'opacity-0'
              }`}
            style={{ animationDelay: `${index * 0.2}s` }} // Animación escalonada
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}