'use client'
import { useState } from 'react'
import WindowSizeSelector from './windowsSizeSelector'
import WindowTypeSelector from './windowTypeSelector'
import Summary from './summary'
import LocationSelector from './locationSelector'
import PaymentTypeSelector from './paymentTypeSelector'
import FinancingSimulator from '@/components/molecules/financingSimulatorProps'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import clsx from 'clsx'

export default function ConfiguratorPage() {
  const [currentStep, setCurrentStep] = useState(1) // Ejemplo: paso 4 de 6
  const [colonia, setIsLocationValid] = useState('')
  const [windowSize, setWindowSize] = useState<string | null>(null)
  const [windowType, setWindowType] = useState<string | null>(null)
  const [paymentType, setPaymentType] = useState<string | null>(null)

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
    <section className="w-full h-full flex flex-col items-center bg-gradient-to-b from-blue-50/55 to-transparent mx-auto pt-20 px-[20%] transition-all duration-300">
      {!colonia && (
        <div className="container flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <Link
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-gray-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-gray-200 dark:hover:bg-gray-200"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">Nuevo</span>{' '}
            <span className="text-sm font-medium">¡Comienza a configurar tu confort ahora!</span>
          </Link>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Tu comodidad es nuestra prioridad
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            En Freddo, te ayudamos a crear un ambiente fresco y cómodo en minutos.
          </p>
          <div className="w-1/2">
            {/* Selector de Ubicación */}
            <LocationSelector onValidLocation={(colonia: string) => setIsLocationValid(colonia)} value={colonia} />
          </div>
        </div>
      )}
      {colonia && (
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
            Paso {currentStep + 1} de {totalSteps}
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-4 w-full">
        <ScrollArea className="">
          {colonia && (
            <LocationSelector onValidLocation={(colonia: string) => setIsLocationValid(colonia)} value={colonia} />
          )}
          {colonia && (
            <WindowTypeSelector
              selectedType={windowType}
              onSelect={(type) => {
                handleNext()
                setWindowType(type)
              }}
            />
          )}
          {windowType && (
            <WindowSizeSelector
              selectedSize={windowSize}
              onSelect={(size) => {
                handleNext()
                setWindowSize(size)
              }}
            />
          )}
          {colonia && windowSize && windowType && (
            <PaymentTypeSelector
              onPaymentTypeSelect={(type) => {
                handleNext()
                setPaymentType(type)
              }}
            />
          )}
        </ScrollArea>
        <div>{windowSize && windowType && <Summary windowSize={windowSize} windowType={windowType} />}</div>
      </div>
      {/* Selección de tamaño de ventana */}
    </section>
  )
}
