import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PAYMENT_OPTIONS, formatPrice } from '@/constants'

type PaymentTypeSelectorProps = {
  onPaymentTypeSelect: (paymentType: string) => void
  selectedType: string | null
}

const PaymentTypeSelector = ({ onPaymentTypeSelect, selectedType }: PaymentTypeSelectorProps) => {
  const handleSelect = (paymentType: string) => {
    onPaymentTypeSelect(paymentType)
  }

  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl font-semibold mb-4">Selecciona tu plan de pago</h2>
      <Tabs defaultValue={selectedType || PAYMENT_OPTIONS[0].id} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          {PAYMENT_OPTIONS.map((option) => (
            <TabsTrigger
              key={option.id}
              value={option.id}
              onClick={() => handleSelect(option.id)}
              className="flex flex-col items-center py-3"
            >
              <span className="font-medium">{option.label}</span>
              <span className="text-sm mt-1">{formatPrice(option.price)}</span>
              {option.monthlyPayment && (
                <span className="text-xs text-gray-500 mt-1">{formatPrice(option.monthlyPayment)}/mes</span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default PaymentTypeSelector
