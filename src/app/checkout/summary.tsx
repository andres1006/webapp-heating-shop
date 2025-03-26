import { FC } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'
import { Separator } from '@/components/ui/separator'
import { PAYMENT_OPTIONS, getPriceByPaymentOption, getMonthlyPaymentByOption, formatPrice } from '@/constants'

interface SummaryProps {
  windowSize: string | null
  windowType: string | null
  paymentType: string | null
  nameDelegation: string | null
  showButtonToPay?: boolean
  isLoading?: boolean
}

const Summary: FC<SummaryProps> = ({
  nameDelegation,
  windowSize,
  windowType,
  paymentType,
  showButtonToPay = false,
  isLoading = false
}) => {
  const params = new URLSearchParams({
    nameDelegation: nameDelegation || '',
    windowType: windowType || '',
    windowSize: windowSize || '',
    paymentType: paymentType || ''
  })

  const canUserDoBuy = !windowSize || !windowType || !paymentType || !nameDelegation

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

  return (
    <div className="flex flex-1 p-4 flex-col py-3 w-full rounded-lg bg-gray-50 gap-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Resumen de Configuración</h2>
      <div className="flex flex-col gap-2">
        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Delegación:</strong>
          {nameDelegation || 'No seleccionado'}
        </p>
        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Tamaño de la ventana:</strong>
          {windowSize || 'No seleccionado'}
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
          {/*  <p className="text-lg font-medium text-gray-700">Total: {formatPrice(price)}</p> */}
        </div>
      </div>
      {showButtonToPay && (
        <>
          <Separator />
          <div className="md:hidden rounded-lg bg-white p-2 fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center gap-2">
            <p className="md:hidden text-sm font-semibold capitalize gap-2 flex justify-center">
              <strong className="lowercase first-letter:capitalize">Total:</strong>
              {priceDisplay}
            </p>
            <p className="text-xs font-light text-gray-400">
              El precio total varia dependiendo de la opción de pago y cuotas que elijas. Para ver los precios y plazos,
              puedes hacerlo dentro de la pasarela de pago de Mercado Pago.
            </p>
            <Link href={`/checkout?${params.toString()}`}>
              <Button
                disabled={canUserDoBuy}
                className="w-full md:block md:w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {isLoading ? 'Procesando...' : 'Proceder a la Compra'}
              </Button>
            </Link>
          </div>
        </>
      )}
      {/* boton fijo en la parte de abajo de la pantalla */}
      {showButtonToPay && (
        <Link href={`/checkout?${params.toString()}`}>
          <Button
            disabled={canUserDoBuy}
            className="w-full md:block md:w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Proceder a la Compra
          </Button>
        </Link>
      )}
    </div>
  )
}

export default Summary
