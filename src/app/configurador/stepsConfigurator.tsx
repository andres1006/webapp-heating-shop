'use client'
import { useMemo, useState, useEffect, useRef } from 'react'
import WindowSizeSelector from './windowsSizeSelector'
import WindowTypeSelector from './windowTypeSelector'
import LocationSelector from './locationSelector'
import PaymentTypeSelector from './paymentTypeSelector'
import { ScrollArea } from '@/components/ui/scroll-area'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import Summary from './summary'
import { IoLocation } from 'react-icons/io5'
import { BiLogoWindows } from 'react-icons/bi'
import { CgSize } from 'react-icons/cg'
import { MdPayment } from 'react-icons/md'
import FloatingLink from '@/components/FloatingLink'
import { addDelegationAndAddClisk } from '@/app/api/actions/delegations'
type ConfiguratorPageProps = {
  nameDelegation: string
  windowSize: string
  windowType: string
  paymentType: string
}

export default function ConfiguratorPage({
  nameDelegation,
  windowSize,
  windowType,
  paymentType
}: ConfiguratorPageProps) {
  const router = useRouter()
  const [coloniaIsValid, setColoniaIsValid] = useState(!!nameDelegation || false)

  // Referencias para cada sección de paso
  const locationRef = useRef<HTMLDivElement>(null)
  const windowTypeRef = useRef<HTMLDivElement>(null)
  const windowSizeRef = useRef<HTMLDivElement>(null)
  const paymentTypeRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  const currentStep = useMemo(() => {
    let count = 0
    if (nameDelegation) count++
    if (windowType) count++
    if (windowSize) count++
    if (paymentType) count++
    return count
  }, [nameDelegation, windowType, windowSize, paymentType])

  // Efecto para desplazarse automáticamente a la sección correspondiente cuando cambia el paso
  useEffect(() => {
    const scrollToSection = () => {
      if (currentStep === 0) {
        locationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (currentStep === 1 && windowTypeRef.current) {
        windowTypeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (currentStep === 2 && windowSizeRef.current) {
        windowSizeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (currentStep === 3 && paymentTypeRef.current) {
        paymentTypeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (currentStep === 4 && summaryRef.current) {
        summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Pequeño retraso para asegurar que los componentes estén renderizados
    const timer = setTimeout(() => {
      scrollToSection()
    }, 100)

    return () => clearTimeout(timer)
  }, [currentStep])

  const updateUrl = (
    newNameDelegation: string,
    newWindowType: string,
    newWindowSize: string,
    newPaymentType: string
  ) => {
    const params = new URLSearchParams({
      nameDelegation: newNameDelegation || '',
      windowType: newWindowType || '',
      windowSize: newWindowSize || '',
      paymentType: newPaymentType || ''
    })
    router.replace(`/configurador?${params.toString()}`, { scroll: false })
  }

  const addclickDelegation = async (nameDelegation: string) => {
    const { error, status } = await addDelegationAndAddClisk(nameDelegation)
    if (error) {
      console.error(error)
    }
  }

  // Determinar si se debe mostrar el enlace flotante al resumen
  const shouldShowFloatingLink = windowSize && windowType && coloniaIsValid && paymentType

  return (
    <>
      {/* Enlace flotante al resumen */}
      {shouldShowFloatingLink && (
        <FloatingLink
          targetRef={summaryRef}
          label={`Total ${paymentType === 'financiacion' ? '$ 10.999' : '$ 9.999'} MXN, ir a pagar`}
          position="bottom-left"
        />
      )}

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

      <div className="container flex flex-col items-center px-4 md:px-0 mx-auto max-w-screen-xl text-center lg:pt-4 z-10 relative">
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Configuración
        </h1>
        <div className="w-full md:w-1/2" ref={locationRef}>
          {/* Selector de Ubicación */}
          <LocationSelector
            onValidLocation={(nameDelegation: string) => {
              // move scroll to windowTypeRef
              windowTypeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              updateUrl(nameDelegation, windowType, windowSize, paymentType)
              addclickDelegation(nameDelegation)
            }}
            value={nameDelegation}
            setColoniaIsValid={setColoniaIsValid}
          />
        </div>
      </div>
      {!coloniaIsValid && nameDelegation && (
        <div className="container flex flex-col items-center px-4 md:px-0 mx-auto max-w-screen-xl text-center lg:pt-4 z-10 relative">
          <p className="mb-8 text-md md:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            En Freddo trabajamos por expandir nuestros servicios a más delegaciones, pronto estaremos en tu delegación
          </p>
        </div>
      )}
      <div className="w-full flex flex-col md:flex-row lg:px-0 flex-wrap gap-4 overflow-auto p-4">
        <ScrollArea className="w-full flex flex-1">
          <section className="w-full flex flex-col gap-4" ref={windowTypeRef}>
            {nameDelegation && coloniaIsValid && (
              <WindowTypeSelector
                selectedType={windowType}
                onSelect={(type) => {
                  // move scroll to windowSizeRef
                  windowSizeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  updateUrl(nameDelegation, type, windowSize, paymentType)
                }}
              />
            )}
          </section>
          <section className="w-full flex flex-col gap-4" ref={windowSizeRef}>
            {windowType && coloniaIsValid && (
              <WindowSizeSelector
                selectedSize={windowSize}
                onSelect={(size) => {
                  // move scroll to paymentTypeRef
                  paymentTypeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  updateUrl(nameDelegation, windowType, size, paymentType)
                }}
              />
            )}
          </section>
          <section className="w-full flex flex-col gap-4" ref={paymentTypeRef}>
            {nameDelegation && windowSize && windowType && coloniaIsValid && (
              <PaymentTypeSelector
                selectedType={paymentType}
                onPaymentTypeSelect={(type) => {
                  // move scroll to summaryRef
                  summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  updateUrl(nameDelegation, windowType, windowSize, type)
                }}
              />
            )}
          </section>
        </ScrollArea>
        <section className="w-full flex flex-col gap-4" ref={summaryRef}>
          {windowSize && windowType && coloniaIsValid && (
            <Summary
              nameDelegation={nameDelegation}
              windowSize={windowSize}
              windowType={windowType}
              paymentType={paymentType}
            />
          )}
        </section>
      </div>
    </>
  )
}
