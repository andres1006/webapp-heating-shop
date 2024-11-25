import ComfortSolutionSection from './comfortSolutionSection'
import WhyChooseUsSection from './whyChooseUsSection'
import TestimonialsSection from './testimonialsSection'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <ComfortSolutionSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <Link href="/configurador" className="flex justify-center items-center">
        <p className="px-4 py-2 rounded-md bg-blue-300 text-white hover:bg-blue-400">Contrata ahora</p>
      </Link>
    </>
  )
}
