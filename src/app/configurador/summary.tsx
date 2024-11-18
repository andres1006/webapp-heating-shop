import { FC } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'
import { Separator } from '@/components/ui/separator'

interface SummaryProps {
  windowSize: string | null
  windowType: string | null
  paymentType: string | null
  colonia: string | null
}

const Summary: FC<SummaryProps> = ({ colonia, windowSize, windowType, paymentType }) => {
  const params = new URLSearchParams({
    colonia: colonia || '',
    windowType: windowType || '',
    windowSize: windowSize || '',
    paymentType: paymentType || ''
  })
  return (
    <div className="flex p-4 flex-col py-3 w-full md:flex-1 rounded-lg bg-gray-50 gap-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Resumen de Configuración</h2>
      <>
        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Tamaño de la ventana:</strong>
          {windowSize || 'No seleccionado'}
        </p>
        <p className="text-sm capitalize gap-2 flex items-center">
          <strong className="lowercase first-letter:capitalize">Tipo de apertura:</strong>
          {windowType || 'No seleccionado'}
        </p>
      </>
      <Separator />
      {/* Validación para habilitar el botón solo si ambas opciones están seleccionadas */}
      <Link href={`/checkout?${params.toString()}`}>
        <Button
          disabled={!windowSize || !windowType || !paymentType || !colonia}
          className="w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Proceder a la Compra
        </Button>
      </Link>
      {paymentType === 'financiacion' && <Separator />}
      {paymentType === 'financiacion' && <FinancingSimulator />}
    </div>
  )
}

export default Summary
