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
    <section className="w-full h-full flex flex-col px-0 items-center bg-gradient-to-b from-blue-50/55 to-transparent mx-auto pt-20 md:px-5 lg:px-[20%] transition-all duration-300">
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
