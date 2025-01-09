'use client'
import { useState } from 'react'
import SubscriptionSummary from './orderSummary'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { IoArrowBackSharp, IoLocation } from 'react-icons/io5'
import UserForm from './userForm'
import { useRouter } from 'next/navigation'
import UbicationForm from './ubicationForm'
import { FormProvider, useForm } from 'react-hook-form'
import { formSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import Summary from './summary'
import { BiLogoWindows } from 'react-icons/bi'
import { CgSize } from 'react-icons/cg'
import { MdPayment } from 'react-icons/md'
import { getCookie, saveDataInCookie } from '@/lib/utils'

type OrderDetails = {
  colonia: string
  windowType: string
  windowSize: string
  paymentType: string
}

type FormData = {
  email: string
  name: string
  phone: string
  street: string
  nameDelegation: string
  nameColonia: string
  numberExt: string
  numberInt: string
  reference: string
}

export default function StepsPage({ colonia, windowType, windowSize, paymentType }: OrderDetails) {
  const [currentStep, setCurrentStep] = useState(6)
  const totalSteps = 7
  const router = useRouter()
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: getCookie('email') || '',
      name: getCookie('name') || '',
      phone: getCookie('phone') || '',
      nameDelegation: getCookie('nameDelegation') || colonia || '',
      street: getCookie('street') || '',
      numberExt: getCookie('numberExt') || '',
      numberInt: getCookie('numberInt') || '',
      reference: getCookie('reference') || ''
    }
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
    console.log(data)
    saveDataInCookie('colonia', colonia)
    saveDataInCookie('windowType', windowType)
    saveDataInCookie('windowSize', windowSize)
    saveDataInCookie('paymentType', paymentType)
    saveDataInCookie('email', data?.email?.toString() || '')
    saveDataInCookie('name', data?.name?.toString() || '')
    saveDataInCookie('phone', data?.phone?.toString() || '')
    saveDataInCookie('nameDelegation', data?.nameDelegation?.toString() || '')
    saveDataInCookie('nameColonia', data?.nameColonia?.toString() || '')
    saveDataInCookie('street', data?.street?.toString() || '')
    saveDataInCookie('numberExt', data?.numberExt?.toString() || '')
    saveDataInCookie('numberInt', data?.numberInt?.toString() || '')
    saveDataInCookie('reference', data?.reference?.toString() || '')
    // id el metodo de pago es contado enviar a mercapago api sino enviar solicitud y guardar en la base de datos
    // enviar a mercapago api
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ windowType, windowSize, colonia, paymentType, ...data })
      })

      const result = await response.json()
      console.log(result)
      if (response.ok) {
        // Redirige al usuario a la URL de pago de MercadoPago
        window.location.href = result.init_point
      } else {
        router.push(`/failure`)
      }
    } catch (error) {
      router.push(`/failure`)
    }
  }

  return (
    <>
      <Button variant="link" onClick={handlePrevious}>
        <div className="flex items-center gap-2">
          <IoArrowBackSharp />
          Regresar
        </div>
      </Button>
      <div className="flex w-full items-center justify-center px-4 md:px-[20%]">
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
      <div className="flex gap-2 w-full flex-wrap justify-center">
        <div className=" w-full md:min-w-[50%]">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 rounded-lg bg-gray-50 mb-8">
              <UserForm />
              <UbicationForm />
              <Button type="submit" disabled={!isValid}>
                Ir a pagar
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
        <div className="w-full md:min-w-[50%] ">
          <Summary colonia={colonia} windowSize={windowSize} windowType={windowType} paymentType={paymentType} />
        </div>
      </div>
    </>
  )
}
