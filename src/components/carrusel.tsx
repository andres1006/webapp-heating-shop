'use client'
import Image from 'next/image';
import { useState } from 'react';

// Imágenes de ejemplo, puedes reemplazarlas con tus imágenes reales.
const images = [
  '/assets/img-1.png',
  'https://i.blogs.es/37b42d/aire-acondicionado-portatil/1366_2000.webp',
  'https://i.blogs.es/37b42d/aire-acondicionado-portatil/1366_2000.webp',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para mover hacia adelante en el carrusel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para mover hacia atrás en el carrusel
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden ">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full bg-center max-h-[600px] bg-gray-100">
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover nset-0 bg-black opacity-60" />
          </div>
        ))}
      </div>
      <div className='w-full absolute  top-1/2 transform -translate-y-1/2 '>
        <div className="text-center px-4 md:px-0 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow">Confort y Frescura en un Par de Clicks</h1>
          <p className="text-lg text-gray-100 mt-4">En unos minutos y desde la comodidad de tu hogar, disfruta de un ambiente fresco con el mejor servicio. Nosotros nos encargamos de todo</p>
          <a href='/configurador' className="hidden  mt-8 md:inline-block bg-blue-200 text-white px-6 py-3 rounded-full shadow hover:bg-blue-400">
            Configura el tuyo
          </a>
        </div>
      </div>

      {/* Botón anterior */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-transparen"
      >
        ‹
      </button>

      {/* Botón siguiente */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-transparen"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-5 right-1/2 flex justify-center mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-300' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel