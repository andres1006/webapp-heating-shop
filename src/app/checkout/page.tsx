'use client'
import { useState } from 'react'
import SubscriptionSummary from './orderSummary'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { IoArrowBackSharp } from 'react-icons/io5'
import Link from 'next/link'

export default function StepsPage() {
  const [currentStep, setCurrentStep] = useState(5)
  const totalSteps = 7

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleAddPaymentMethod = () => {
    // Lógica para agregar método de pago
  }

  return (
    <div className="container mx-auto pt-20 px-4">
      <Link href="/configurador" onClick={handlePrevious}>
        <div className="flex items-center gap-2">
          <IoArrowBackSharp />
          Regresar
        </div>
      </Link>
      <div className="flex justify-center flex-col items-center mb-6">
        <div className="flex space-x-2">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={clsx(`w-2 h-2 rounded-full`, {
                'bg-blue-100 w-2 h-2': index < currentStep,
                'bg-blue-200 w-[20px]': index === currentStep,
                'bg-gray-200 w-2 h-2': index > currentStep
              })}
            />
          ))}
        </div>
        <p className="text-sm mt-2 ">
          Paso {currentStep} de {totalSteps}
        </p>
      </div>
      <div className="w-full px-40">
        {currentStep === 5 && (
          <SubscriptionSummary
            productName="bebbia Smart"
            address="12 9a 85, Centro (Área 9), Ciudad de México, Ciudad de México. 06090"
            originalPrice={369}
            discountCode="BUENFIN24"
            total={258.3}
            onAddPaymentMethod={handleAddPaymentMethod}
          />
        )}
      </div>
    </div>
  )
}
