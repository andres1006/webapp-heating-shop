'use server'
import StepsPage from './summaryCheckout'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

type SearchParams = {
  nameDelegation: string
  windowType: string
  windowSize: string
  paymentType: string
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const nameDelegation = searchParams?.nameDelegation || ''
  const windowType = searchParams?.windowType || ''
  const windowSize = searchParams?.windowSize || ''
  const paymentType = searchParams?.paymentType || ''

  if (!nameDelegation || !windowType || !windowSize || !paymentType) {
    const params = new URLSearchParams({
      nameDelegation: nameDelegation,
      windowType: windowType,
      windowSize: windowSize,
      paymentType: paymentType
    })
    redirect(`/configurador?${params.toString()}`)
  }

  // No necesitamos obtener el usuario aquí, ya que ahora verificaremos
  // la existencia del usuario en la tabla User directamente en el componente StepsPage

  return (
    <div className="container mx-auto pt-20 px-4">
      <StepsPage
        nameDelegation={searchParams?.nameDelegation || ''}
        windowType={searchParams?.windowType || ''}
        windowSize={searchParams?.windowSize || ''}
        paymentType={searchParams?.paymentType || ''}
      />
    </div>
  )
}

export default Page
