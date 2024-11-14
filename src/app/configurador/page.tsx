import { cookies } from 'next/headers'
import ConfiguratorPage from './stepsConfigurator'

type SearchParams = {
  colonia: string
  windowType: string
  windowSize: string
  paymentType: string
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <section className="w-full h-full flex flex-col items-center bg-gradient-to-b from-blue-50/55 to-transparent mx-auto pt-20 px-[20%] transition-all duration-300">
      <ConfiguratorPage
        colonia={searchParams?.colonia || ''}
        windowType={searchParams?.windowType || ''}
        windowSize={searchParams?.windowSize || ''}
        paymentType={searchParams?.paymentType || ''}
      />
    </section>
  )
}

export default Page
