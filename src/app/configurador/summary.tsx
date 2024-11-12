import { FC } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'

interface SummaryProps {
  windowSize: string | null
  windowType: string | null
}

const Summary: FC<SummaryProps> = ({ windowSize, windowType }) => (
  <div className="p-6  rounded-lg bg-gray-50">
    <h2 className="text-xl font-semibold mb-4">Resumen de Configuración</h2>
    <p>
      <strong>Tamaño de la ventana:</strong> {windowSize || 'No seleccionado'}
    </p>
    <p>
      <strong>Tipo de apertura:</strong> {windowType || 'No seleccionado'}
    </p>

    <FinancingSimulator />

    {/* Validación para habilitar el botón solo si ambas opciones están seleccionadas */}
    <Link href="/checkout">
      <Button
        disabled={!windowSize || !windowType}
        className={`mt-6 px-4 py-2 rounded ${
          windowSize && windowType ? 'bg-blue-300 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Proceder a la Compra
      </Button>
    </Link>
  </div>
)

export default Summary
