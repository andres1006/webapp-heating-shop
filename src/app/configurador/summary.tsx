import { FC } from 'react';
import Link from 'next/link';

interface SummaryProps {
  windowSize: string | null;
  windowType: string | null;
}

const Summary: FC<SummaryProps> = ({ windowSize, windowType }) => (
  <div className="p-6 border rounded-lg bg-gray-50">
    <h2 className="text-xl font-semibold mb-4">Resumen de Configuración</h2>
    <p><strong>Tamaño de la ventana:</strong> {windowSize || 'No seleccionado'}</p>
    <p><strong>Tipo de apertura:</strong> {windowType || 'No seleccionado'}</p>

    {/* Validación para habilitar el botón solo si ambas opciones están seleccionadas */}
    <Link href="/checkout">
      <button
        disabled={!windowSize || !windowType}
        className={`mt-6 px-4 py-2 rounded ${windowSize && windowType ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Proceder a la Compra
      </button>
    </Link>
  </div>
);

export default Summary;
