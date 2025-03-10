'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Imágenes para el carrusel
const images = ['/assets/BANNERFREDDO-02.png', '/assets/BANNERFREDDO-03.png']

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Función para mover hacia adelante en el carrusel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  // Función para mover hacia atrás en el carrusel
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out h-[32vh] md:h-[50vh] mt-[50px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full bg-center max-h-[100%]">
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-blue-600 p-2 rounded-full transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-blue-600 p-2 rounded-full transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
