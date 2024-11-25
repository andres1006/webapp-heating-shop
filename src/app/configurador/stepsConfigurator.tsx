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
import { IoLocation } from 'react-icons/io5'
import { BiLogoWindows } from 'react-icons/bi'
import { CgSize } from 'react-icons/cg'
import { MdPayment } from 'react-icons/md'

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
    router.replace(`/configurador?${params.toString()}`, { scroll: false })
  }

  console.log(currentStep)

  return (
    <>
      <div className="w-full flex items-center justify-center px-[10%] md:px-[20%]">
        <ol className="w-full flex  mb-4 sm:mb-5">
          <li
            className={clsx(
              'flex w-full items-center',
              currentStep > 0 &&
                'after:w-full after:h-1 after:border-b after:border-blue-300 after:border-4 after:inline-block dark:after:border-gray-700',
              currentStep <= 0 &&
                'after:w-full after:h-1 after:border-b after:border-4 after:inline-block after:border-blue-200'
            )}
          >
            <div
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0',
                currentStep === 0 && 'bg-blue-200 text-white dark:text-blue-200',
                currentStep > 0 && 'bg-blue-400 dark:bg-blue-300 text-white',
                currentStep < 0 && 'bg-white text-blue-300 dark:text-blue-300'
              )}
            >
              <IoLocation style={{ fontSize: '1.5rem' }} />
            </div>
          </li>
          <li
            className={clsx(
              'flex w-full items-center',
              currentStep >= 1 &&
                'after:w-full after:h-1 after:border-b after:border-blue-300 after:border-4 after:inline-block dark:after:border-gray-700',
              currentStep < 1 &&
                'after:w-full after:h-1 after:border-b after:border-4 after:inline-block after:border-blue-200'
            )}
          >
            <div
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0',
                currentStep === 1 && 'bg-blue-200 text-white dark:text-blue-200',
                currentStep > 1 && 'bg-blue-400 dark:bg-blue-300 text-white',
                currentStep < 1 && 'bg-white text-blue-300 dark:text-blue-300'
              )}
            >
              <BiLogoWindows style={{ fontSize: '1.5rem' }} />
            </div>
          </li>
          <li
            className={clsx(
              'flex w-full items-center',
              currentStep >= 2 &&
                'after:w-full after:h-1 after:border-b after:border-blue-300 after:border-4 after:inline-block dark:after:border-gray-700',
              currentStep < 2 &&
                'after:w-full after:h-1 after:border-b after:border-4 after:inline-block after:border-blue-200'
            )}
          >
            <div
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0',
                currentStep === 2 && 'bg-blue-200 text-white dark:text-blue-200',
                currentStep > 2 && 'bg-blue-400 dark:bg-blue-300 text-white',
                currentStep < 2 && 'bg-white text-blue-300 dark:text-blue-300'
              )}
            >
              <CgSize style={{ fontSize: '1.5rem' }} />
            </div>
          </li>
          <div
            className={clsx(
              'flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0',
              currentStep === 3 && 'bg-blue-200 text-white dark:text-blue-200',
              currentStep > 3 && 'bg-blue-400 dark:bg-blue-300 text-white',
              currentStep < 3 && 'bg-white text-blue-300 dark:text-blue-300'
            )}
          >
            <MdPayment style={{ fontSize: '1.5rem' }} />
          </div>
        </ol>
      </div>

      {!colonia && (
        <div className="container flex flex-col items-center px-4 md:px-0 mx-auto max-w-screen-xl text-center lg:pt-4 z-10 relative">
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Configuración
          </h1>
          <p className="mb-8 text-md md:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            En Freddo trabajamos por expandir nuestros servicios a más colonias, por ahora solo estamos sirviendo a las
            siguientes delegaciones en la Ciudad de México:
          </p>
          <div className="w-full md:w-1/2">
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
      <div className="w-full flex flex-col md:flex-row lg:px-0 flex-wrap gap-4 overflow-auto p-4">
        <ScrollArea className="w-full flex flex-1">
          {colonia && (
            <div className="w-full">
              <LocationSelector
                onValidLocation={(colonia: string) => {
                  updateUrl(colonia, windowType, windowSize, paymentType)
                }}
                value={colonia}
              />
            </div>
          )}
          <div className="w-full">
            {colonia && (
              <WindowTypeSelector
                selectedType={windowType}
                onSelect={(type) => {
                  updateUrl(colonia, type, windowSize, paymentType)
                }}
              />
            )}
          </div>
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
        {windowSize && windowType && (
          <Summary colonia={colonia} windowSize={windowSize} windowType={windowType} paymentType={paymentType} />
        )}
      </div>
    </>
  )
}
