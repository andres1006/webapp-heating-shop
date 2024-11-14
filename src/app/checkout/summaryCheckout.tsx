'use client'
import { useEffect, useState } from 'react'
import SubscriptionSummary from './orderSummary'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { IoArrowBackSharp } from 'react-icons/io5'
import UserForm from './userForm'
import { useRouter } from 'next/navigation'
import UbicationForm from './ubicationForm'
import { FormProvider, useForm } from 'react-hook-form'
import { formSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import Summary from './summary'

type OrderDetails = {
  colonia: string
  windowType: string
  windowSize: string
  paymentType: string
}

export default function StepsPage({ colonia, windowType, windowSize, paymentType }: OrderDetails) {
  const [currentStep, setCurrentStep] = useState(6)
  const totalSteps = 7
  const router = useRouter()
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const {
    handleSubmit,
    formState: { errors, isValid }
  } = methods

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => {
        if (prev === 6) {
          const params = new URLSearchParams({
            colonia: colonia,
            windowType: windowType,
            windowSize: windowSize,
            paymentType: paymentType
          })
          router.push(`/configurador?${params.toString()}`)
        }
        return prev - 1
      })
    }
  }

  const onSubmit = async (data: FormData) => {
    console.log('SUCCESS', data)
  }

  return (
    <>
      <Button variant="link" onClick={handlePrevious}>
        <div className="flex items-center gap-2">
          <IoArrowBackSharp />
          Regresar
        </div>
      </Button>
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
      <div className="flex gap-2 w-full flex-wrap justify-center">
        <div className="w-auto min-w-[50%]">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 rounded-lg bg-gray-50 mb-8">
              <UserForm />
              <UbicationForm />
              <Button type="submit" disabled={!isValid}>
                Continuar
              </Button>
              {/* validate object empty */}
              {currentStep === 7 && (
                <SubscriptionSummary
                  productName={windowType}
                  address="12 9a 85, Centro (Área 9), Ciudad de México, Ciudad de México. 06090"
                  originalPrice={369}
                  discountCode="BUENFIN24"
                  total={258.3}
                  onAddPaymentMethod={handleNext}
                />
              )}
            </form>
          </FormProvider>
        </div>
        <div className="w-auto">
          <Summary colonia={colonia} windowSize={windowSize} windowType={windowType} paymentType={paymentType} />
        </div>
      </div>
    </>
  )
}
