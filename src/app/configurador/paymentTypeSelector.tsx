import { Button } from '@/components/ui/button'
import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
      <h2 className="text-xl font-semibold mb-4">Selecciona como quieres pagar tu servicio</h2>
      <Tabs defaultValue={selectedType || ''}>
        <TabsList>
          <TabsTrigger value="contado" onClick={() => handleSelect('contado')}>
            Contado
          </TabsTrigger>
          <TabsTrigger value="financiacion" onClick={() => handleSelect('financiacion')}>
            12 Meses sin intereses
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default PaymentTypeSelector
