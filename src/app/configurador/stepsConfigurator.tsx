'use client'
import { useMemo } from 'react'
import WindowSizeSelector from './windowsSizeSelector'
import WindowTypeSelector from './windowTypeSelector'
import LocationSelector from './locationSelector'
import PaymentTypeSelector from './paymentTypeSelector'
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import Summary from './summary'

type ConfiguratorPageProps = {
  colonia: string
  windowSize: string
  windowType: string
  paymentType: string
}

const totalSteps = 7
export default function ConfiguratorPage({ colonia, windowSize, windowType, paymentType }: ConfiguratorPageProps) {
  const router = useRouter()

  const currentStep = useMemo(() => {
    let count = 0
    if (colonia) count++
    if (windowType) count++
    if (windowSize) count++
    if (paymentType) count++
    return count
  }, [colonia, windowType, windowSize, paymentType])

  const updateUrl = (newColonia: string, newWindowType: string, newWindowSize: string, newPaymentType: string) => {
    const params = new URLSearchParams({
      colonia: newColonia || '',
      windowType: newWindowType || '',
      windowSize: newWindowSize || '',
      paymentType: newPaymentType || ''
    })
    router.push(`/configurador?${params.toString()}`)
  }

  return (
    <>
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
            <LocationSelector
              onValidLocation={(colonia: string) => {
                updateUrl(colonia, windowType, windowSize, paymentType)
              }}
              value={colonia}
            />
          </div>
        </div>
      )}
      {colonia && (
        <div className="flex justify-center flex-col items-center mb-6">
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, index) => (
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
            <LocationSelector
              onValidLocation={(colonia: string) => {
                updateUrl(colonia, windowType, windowSize, paymentType)
              }}
              value={colonia}
            />
          )}
          {colonia && (
            <WindowTypeSelector
              selectedType={windowType}
              onSelect={(type) => {
                updateUrl(colonia, type, windowSize, paymentType)
              }}
            />
          )}
          {windowType && (
            <WindowSizeSelector
              selectedSize={windowSize}
              onSelect={(size) => {
                updateUrl(colonia, windowType, size, paymentType)
              }}
            />
          )}
          {colonia && windowSize && windowType && (
            <PaymentTypeSelector
              selectedType={paymentType}
              onPaymentTypeSelect={(type) => {
                updateUrl(colonia, windowType, windowSize, type)
              }}
            />
          )}
        </ScrollArea>
        <div>
          {windowSize && windowType && (
            <Summary colonia={colonia} windowSize={windowSize} windowType={windowType} paymentType={paymentType} />
          )}
        </div>
      </div>
    </>
  )
}
