import Carousel from '@/components/carrusel'
import FeaturesSection from '@/components/featuresSections'
import Footer from '@/components/footer'
import React from 'react'
import HomePage from './home/page'

const Page = () => {
  return (
    <div className='flex flex-col h-full'>
      <Carousel />
      <section className='w-full flex-1 overflow-auto'>
        <HomePage />
      </section>
      <Footer />
    </div>
  )
}

export default Page