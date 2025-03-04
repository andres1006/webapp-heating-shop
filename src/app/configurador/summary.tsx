import { FC } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'
import { Separator } from '@/components/ui/separator'

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
  const params = new URLSearchParams({
    nameDelegation: nameDelegation || '',
    windowType: windowType || '',
    windowSize: windowSize || '',
    paymentType: paymentType || ''
  })
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
            {windowSize || 'No seleccionado'} ( {dimensions[windowSize as keyof typeof dimensions] || 'No seleccionado'}{' '}
          </span>
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
          {paymentType === 'financiacion' ? '$ 1.083 MXN Mensuales' : '$ 11.999 MXN un solo pago'}
        </p>
      </div>
      <Separator />
      <Link href={`/checkout?${params.toString()}`}>
        <Button
          disabled={!windowSize || !windowType || !paymentType || !nameDelegation}
          className=" w-full md:block md:w-full px-4  py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Proceder a la Compra
        </Button>
      </Link>
      {/* Validación para habilitar el botón solo si ambas opciones están seleccionadas */}
    </div>
  )
}

export default Summary
