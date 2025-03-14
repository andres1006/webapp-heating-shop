import { FC, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'
import { Separator } from '@/components/ui/separator'
import { PAYMENT_OPTIONS, getPriceByPaymentOption, getMonthlyPaymentByOption, formatPrice } from '@/constants'
import LoadingButton from '@/components/ui/loading-button'
import { createUrlWithParams } from '@/utils/url-helpers'

const dimensions = {
  pequeña: 'Hasta 1 metro de alto',
  mediana: 'Entre 1 y 2 metros de alto',
  grande: 'Mayor a 2 metros de alto'
}

interface SummaryProps {
  windowSize: string | null
  windowType: string | null
  paymentType: string | null
  nameDelegation: string | null
}

const Summary: FC<SummaryProps> = ({ nameDelegation, windowSize, windowType, paymentType }) => {
  const [isLoading, setIsLoading] = useState(false)

  // Obtener la opción de pago seleccionada
  const selectedOption = PAYMENT_OPTIONS.find((option) => option.id === paymentType) || PAYMENT_OPTIONS[0]

  // Determinar el precio según la opción de pago
  const price = getPriceByPaymentOption(paymentType || 'contado')
  const monthlyPayment = getMonthlyPaymentByOption(paymentType || 'contado')

  // Preparar el texto a mostrar
  let priceDisplay = formatPrice(price)
  if (monthlyPayment) {
    priceDisplay = `${formatPrice(monthlyPayment)} mensuales por ${selectedOption.months} meses`
  } else {
    priceDisplay = `${formatPrice(price)} un solo pago`
  }

  const handleProceed = () => {
    setIsLoading(true)
    // Crear URL de checkout con parámetros
    const checkoutUrl = createUrlWithParams('/checkout', {
      nameDelegation,
      windowType,
      windowSize,
      paymentType
    })

    // Simulamos un pequeño retraso para mostrar el estado de carga
    setTimeout(() => {
      window.location.href = checkoutUrl
    }, 500)
  }

  const isFormComplete = !!windowSize && !!windowType /* && !!paymentType */ && !!nameDelegation

  return (
    <div className="flex flex-1 p-4 flex-col py-3 w-full rounded-lg bg-gray-50 gap-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Resumen de Configuración</h2>
      <div className="flex flex-col gap-2">
        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Delegación:</strong>
          {nameDelegation || 'No seleccionado'}
        </p>
        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize truncate">Tamaño de la ventana:</strong>
          <span className="truncate">
            ({windowSize || 'No seleccionado'}) (
            {dimensions[windowSize as keyof typeof dimensions] || 'No seleccionado'}){' '}
          </span>
        </p>

        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Tipo de apertura:</strong>
          {windowType || 'No seleccionado'}
        </p>
        {/*         <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Plan de Pago:</strong>
          {selectedOption.label}
        </p> */}

        <div className="flex flex-col items-center mt-5">
          <p className="text-2xl font-semibold">Desde: $699</p>
          {/*     <p className="text-lg font-medium text-gray-700">Total: {formatPrice(price)}</p> */}
        </div>
      </div>
      <Separator />
      <LoadingButton
        isLoading={isLoading}
        disabled={!isFormComplete}
        onClick={handleProceed}
        className="w-full md:block md:w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
      >
        Proceder a la Compra
      </LoadingButton>
    </div>
  )
}

export default Summary
