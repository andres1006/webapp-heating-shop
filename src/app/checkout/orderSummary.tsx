import { FC } from 'react';

interface OrderSummaryProps {
  onNext: () => void;
}

const OrderSummary: FC<OrderSummaryProps> = ({ onNext }) => {
  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
      <p><strong>Producto:</strong> Aire Acondicionado</p>
      <p><strong>Tamaño de Ventana:</strong> Grande</p>
      <p><strong>Tipo de Apertura:</strong> Corrediza</p>
      <p><strong>Precio:</strong> $299.00</p>
      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Continuar con el Pago
      </button>
    </div>
  );
};

export default OrderSummary;