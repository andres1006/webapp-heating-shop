import { FC } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'
import { Separator } from '@/components/ui/separator'

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
        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Tipo de Pago:</strong>
          {paymentType === 'financiacion' ? '12 Meses sin intereses' : 'Contado'}
        </p>
        <p className="text-2xl font-semibold capitalize gap-2 flex justify-center mt-5">
          <strong className="lowercase first-letter:capitalize">Total:</strong>
          {paymentType === 'financiacion' ? '$ 1.083 MXN Mensuales' : '$ 11.999 MXN'}
        </p>
      </div>
      {showButtonToPay && (
        <>
          <Separator />
          <div className="md:hidden rounded-lg bg-white p-2 fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center gap-2">
            <p className=" md:hidden text-sm font-semibold capitalize gap-2 flex justify-center">
              <strong className="lowercase first-letter:capitalize">Total:</strong>
              {paymentType === 'financiacion' ? '$ 1.083 MXN Mensuales' : '$ 11.999 MXN'}
            </p>
            <Link href={`/checkout?${params.toString()}`}>
              <Button
                disabled={canUserDoBuy}
                className=" w-full md:block md:w-full px-4  py-2 rounded bg-green-600 text-white hover:bg-green-700"
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
            className="w-full md:block md:w-full px-4  py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Proceder a la Compra
          </Button>
        </Link>
      )}
    </div>
  )
}

export default Summary
