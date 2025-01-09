'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { FaRegSadCry } from 'react-icons/fa'

const page = ({ searchParams }: { searchParams: { message: string } }) => {
  const message = searchParams.message

  // recover the data in cockies to recover it in the summaryCheckout
  const colonia = Cookies.get('colonia') || ''
  const windowType = Cookies.get('windowType') || ''
  const windowSize = Cookies.get('windowSize') || ''
  const paymentType = Cookies.get('paymentType') || ''

  console.log(colonia, windowType, windowSize, paymentType)
  const params = new URLSearchParams({
    colonia,
    windowType,
    windowSize,
    paymentType
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FaRegSadCry className="text-7xl text-blue-400" />
      <h1 className="text-2xl font-bold mt-2">Pago Fallido</h1>
      <p className="text-lg text-center">
        Lo sentimos, el pago se cancelo o no se realizo correctamente. Por favor, intenta nuevamente.
        {message}
      </p>
      <div className="flex gap-2 mt-4">
        <Link href={`/checkout?${params.toString()}`}>
          <Button>Reintentar pago</Button>
        </Link>
        <Link href={`/`}>
          <Button>Regresar a la página principal</Button>
        </Link>
      </div>
    </div>
  )
}

export default page
