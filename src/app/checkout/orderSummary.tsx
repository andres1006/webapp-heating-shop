import { FC } from 'react'

type SubscriptionSummaryProps = {
  productName: string
  address: string
  originalPrice: number
  discountCode: string
  total: number
  onAddPaymentMethod: () => void
  image?: string
}

const SubscriptionSummary: FC<SubscriptionSummaryProps> = ({
  productName,
  address,
  originalPrice,
  discountCode,
  total,
  onAddPaymentMethod,
  image
}) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Resumen de tu suscripción mensual</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Tu próximo producto:</h3>
        <p>{productName}</p>
        {image && <img src={image} alt="bebbia Smart" className="w-30 h-30 rounded-lg" />}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Instalación</h3>
        <p>{address}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Suscripción</h3>
        <p>
          Suscripción: <span className="line-through">${originalPrice} al mes</span>
        </p>
        <p>Descuento: {discountCode}</p>
        <p>
          Total: <span className="text-blue-600">${total} MXN</span> (Incluye IVA)
        </p>
      </div>
      <button onClick={onAddPaymentMethod} className="bg-blue-300 text-white px-4 py-2 rounded w-full">
        Siguiente
      </button>
    </div>
  )
}

export default SubscriptionSummary
