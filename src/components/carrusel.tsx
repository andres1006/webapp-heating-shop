'use client'
import { useState } from 'react'

// Imágenes de ejemplo, puedes reemplazarlas con tus imágenes reales.
const imagesMd = ['/assets/BANNERFREDDO-02.png']
const imagesSm = ['/assets/BANNERFREDDO-02.png', '/assets/BANNERFREDDO-03.png']

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  /*   // Función para mover hacia adelante en el carrusel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imagesMd.length - 1 ? 0 : prevIndex + 1))
  }

  // Función para mover hacia atrás en el carrusel
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagesMd.length - 1 : prevIndex - 1))
  } */

  return (
    <div className="relative w-full mx-auto overflow-hidden ">
      <div
        className="flex transition-transform duration-500 ease-out h-[32vh] md:h-[50vh] mt-[50px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imagesMd.map((image, index) => (
          <div key={index} className="min-w-full h-full bg-center max-h-[100%] bg-blue-200">
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover " />
          </div>
        ))}
      </div>
      {/*       <div className="w-full  md:mt-5 ease-out bg-blue-50 p-3">
        <h1 className="text-xl  md:text-2xl  font-bold text-black  text-center ">
          ¿Calor? ¡No mas! Con Freddo, disfruta confort y frescura en un par de clicks
        </h1>
      </div> */}

      {/* Botón anterior */}
      {/*  <button
        onClick={prevSlide}
        className="ease-out absolute left-5 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-transparen"
      >
        ‹
      </button> */}

      {/* Botón siguiente */}
      {/*    <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-transparen"
      >
        ›
      </button> */}

      {/* Indicadores */}
      {/*  <div className="absolute bottom-5 right-1/2 flex justify-center mt-2">
        {imagesMd.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-300' : 'bg-gray-200'}`}
          />
        ))}
      </div> */}
    </div>
  )
}

export default Carousel
