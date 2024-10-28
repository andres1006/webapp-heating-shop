import { FC } from 'react';
import Link from 'next/link';

const Confirmation: FC = () => {
  return (
    <div className="p-6 border rounded-lg bg-gray-50 text-center">
      <h2 className="text-2xl font-semibold mb-4">¡Gracias por tu compra!</h2>
      <p>Tu pedido ha sido confirmado y está en proceso de preparación.</p>
      <p>Recibirás un correo electrónico con los detalles de tu compra.</p>
      <Link href="/">
        <a className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded">
          Volver al Inicio
        </a>
      </Link>
    </div>
  );
};

export default Confirmation;