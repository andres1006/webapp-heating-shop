'use server'
import { cookies } from 'next/headers'
import StepsPage from './summaryCheckout'
import { redirect } from 'next/navigation'

type SearchParams = {
  colonia: string
  windowType: string
  windowSize: string
  paymentType: string
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const colonia = searchParams?.colonia || ''
  const windowType = searchParams?.windowType || ''
  const windowSize = searchParams?.windowSize || ''
  const paymentType = searchParams?.paymentType || ''

  if (!colonia || !windowType || !windowSize || !paymentType) {
    const params = new URLSearchParams({
      colonia: colonia,
      windowType: windowType,
      windowSize: windowSize,
      paymentType: paymentType
    })
    redirect(`/configurador?${params.toString()}`)
  }

  return (
    <div className="container mx-auto pt-20 px-4">
      <StepsPage
        colonia={searchParams?.colonia || ''}
        windowType={searchParams?.windowType || ''}
        windowSize={searchParams?.windowSize || ''}
        paymentType={searchParams?.paymentType || ''}
      />
    </div>
  )
}

export default Page
