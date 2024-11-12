import { Button } from '@/components/ui/button'
import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type PaymentTypeSelectorProps = {
  onPaymentTypeSelect: (paymentType: string) => void
}

const PaymentTypeSelector = ({ onPaymentTypeSelect }: PaymentTypeSelectorProps) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null)

  const handleSelect = (paymentType: string) => {
    setSelectedPaymentType(paymentType)
    onPaymentTypeSelect(paymentType)
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Selecciona el Tipo de Pago</h2>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="contado" onClick={() => handleSelect('contado')}>
            Contado
          </TabsTrigger>
          <TabsTrigger value="financiacion" onClick={() => handleSelect('financiacion')}>
            Financiación
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default PaymentTypeSelector
