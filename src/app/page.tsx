import Carousel from '@/components/carrusel'
import React from 'react'
import HomePage from './home/page'

const Page = () => {
  return (
    <div className="flex flex-col h-full">
      <Carousel />
      <section className="w-full flex-1 overflow-auto">
        <HomePage />
      </section>
    </div>
  )
}

export default Page
