'use client'
import { useState, useRef } from 'react'
import SubscriptionSummary from './orderSummary'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { IoArrowBackSharp, IoLocation } from 'react-icons/io5'
import UserForm from './userForm'
import { useRouter } from 'next/navigation'
import UbicationForm from './ubicationForm'
import { FormProvider, useForm } from 'react-hook-form'
import { formSchema, formSchemaLoginOrSignup } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import Summary from './summary'
import { BiLogoWindows } from 'react-icons/bi'
import { CgSize } from 'react-icons/cg'
import { MdPayment, MdSummarize } from 'react-icons/md'
import { getCookie, saveDataInCookie } from '@/lib/utils'
import { Signup } from './signup'
import { User } from '@supabase/supabase-js'
import { updateUser } from '../api/actions/user'
import { createProduct } from '../api/actions/product'
import { useSequentialScrollToSection } from '@/hooks/useScrollToSection'
import FloatingLink from '@/components/FloatingLink'

type OrderDetails = {
  nameDelegation: string
  windowType: string
  windowSize: string
  paymentType: string
  user: User | null
}

type FormDataLoginOrSignup = {
  email: string
}

type FormData = {
  name: string
  phone: string
  street: string
  nameDelegation: string
  nameColonia: string
  numberExt: string
  numberInt: string
  reference: string
}

export default function StepsPage({ nameDelegation, windowType, windowSize, paymentType, user }: OrderDetails) {
  const [currentStep, setCurrentStep] = useState(6)
  const [isLoginOrSignup, setIsLoginOrSignup] = useState<
    'CONFIRM_EMAIL' | 'USER_SESSION' | 'USER_VALIDATED' | 'INIT_SESSION'
  >(user ? 'USER_SESSION' : 'INIT_SESSION')
  const totalSteps = 7
  const router = useRouter()

  // Referencias para las secciones de pasos
  const stepSectionRef = useRef<HTMLDivElement>(null)
  const userFormRef = useRef<HTMLDivElement>(null)
  const ubicationFormRef = useRef<HTMLFormElement>(null)
  const loginFormRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  // Utilizar el hook personalizado para el desplazamiento secuencial
  useSequentialScrollToSection(
    [currentStep, isLoginOrSignup],
    [
      // Primero desplazarse a la sección de pasos
      { condition: true, ref: stepSectionRef, sequentialDelay: 0 },
      // Luego, dependiendo del paso actual, desplazarse a la sección específica
      {
        condition: currentStep === 6 && !!userFormRef.current,
        ref: userFormRef,
        sequentialDelay: 300
      },
      {
        condition: currentStep === 7 && !!ubicationFormRef.current,
        ref: ubicationFormRef,
        sequentialDelay: 300
      }
    ],
    { behavior: 'smooth', block: 'center', delay: 100 }
  )

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.user_metadata?.name || '',
      phone: user?.user_metadata?.phone || '',
      nameDelegation: user?.user_metadata?.nameDelegation || nameDelegation || '',
      nameColonia: user?.user_metadata?.nameColonia || '',
      street: user?.user_metadata?.street || '',
      numberExt: user?.user_metadata?.numberExt || '',
      numberInt: user?.user_metadata?.numberInt || '',
      reference: user?.user_metadata?.reference || ''
    }
  })
  const {
    handleSubmit,
    formState: { errors, isValid }
  } = methods

  const methodsLoginOrSignup = useForm<FormDataLoginOrSignup>({
    resolver: zodResolver(formSchemaLoginOrSignup),
    defaultValues: {
      email: user?.email || ''
    }
  })
  const {
    handleSubmit: handleSubmitLoginOrSignup,
    formState: { errors: errorsLoginOrSignup, isValid: isValidLoginOrSignup }
  } = methodsLoginOrSignup

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
            nameDelegation: nameDelegation,
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
    if (!user) {
      return
    }
    // TODO: create action to update user information
    const { data: userData, error } = await updateUser({
      name: data?.name?.toString() || '',
      phone: data?.phone?.toString() || '',
      street: data?.street?.toString() || '',
      numberExt: data?.numberExt?.toString() || '',
      numberInt: data?.numberInt?.toString() || '',
      reference: data?.reference?.toString() || '',
      nameColonia: data?.nameColonia?.toString() || '',
      nameDelegation: data?.nameDelegation?.toString() || ''
    })

    if (error) {
      console.log('error', error)
    }

    saveDataInCookie('windowType', windowType)
    saveDataInCookie('windowSize', windowSize)
    saveDataInCookie('paymentType', paymentType)

    // id el metodo de pago es contado enviar a mercapago api sino enviar solicitud y guardar en la base de datos
    // // enviar a mercapago api
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ windowType, windowSize, paymentType, ...data })
      })

      const result = await response.json()
      if (result.error || !result?.init_point) {
        alert(result.error)
        return
      }

      if (response.ok) {
        const { data, error } = await createProduct({
          windowType,
          windowSize,
          paymentType,
          price: paymentType === 'financiacion' ? 10999 : 9999,
          status: 'pending',
          link_payment: result.init_point,
          Id_user: user?.id || '',
          client_id: result.client_id
        })
        if (error) {
          router.push(`/failure`)
          return
        }

        // Redirige al usuario a la URL de pago de MercadoPago
        window.location.href = result.init_point
      } else {
        router.push(`/failure`)
      }
    } catch (error) {
      router.push(`/failure`)
    }
  }

  const onSubmitLoginOrSignup = async (data: FormDataLoginOrSignup) => {
    try {
      const response = await Signup({
        email: data?.email?.toString() || ''
      })
      console
      if (response.code === 'CONFIRM_EMAIL') {
        saveDataInCookie('nameDelegation', nameDelegation)
        saveDataInCookie('windowType', windowType)
        saveDataInCookie('windowSize', windowSize)
        saveDataInCookie('paymentType', paymentType)
        setIsLoginOrSignup(response.code)
        // TODO: save cookies info product
        return
      }
      if (response.code === 'USER_SESSION') {
        methods.setValue('name', response?.data?.user?.user_metadata?.name || '')
        methods.setValue('phone', response?.data?.user?.user_metadata?.phone || '')
        methods.setValue('nameDelegation', response?.data?.user?.user_metadata?.nameDelegation || '')
        methods.setValue('street', response?.data?.user?.user_metadata?.street || '')
        methods.setValue('numberExt', response?.data?.user?.user_metadata?.numberExt || '')
        methods.setValue('numberInt', response?.data?.user?.user_metadata?.numberInt || '')
        methods.setValue('reference', response?.data?.user?.user_metadata?.reference || '')
        // TODO: update form detatails
        setIsLoginOrSignup(response.code)
        return
      }
      if (response.code === 'ERROR') {
        router.push(`/failure`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      {/* Enlace flotante al resumen */}
      <FloatingLink
        targetRef={summaryRef}
        label={`Ir a pagar ${paymentType === 'financiacion' ? '10.999' : '9.999'} MXN`}
        icon={<MdSummarize className="mr-2" />}
        position="bottom-left"
      />

      <Button variant="link" onClick={handlePrevious}>
        <div className="flex items-center gap-2">
          <IoArrowBackSharp />
          Regresar
        </div>
      </Button>
      <div className="flex w-full items-center justify-center px-4 md:px-[20%]" ref={stepSectionRef}>
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
      <div className="flex gap-2 w-full flex-wrap justify-center flex-col md:flex-row">
        <div className="w-full md:min-w-[50%]">
          {isLoginOrSignup === 'CONFIRM_EMAIL' && (
            <div className="w-full p-5 rounded-lg mb-8 text-center" ref={userFormRef}>
              <p className="text-lg font-bold">Por favor, confirma tu correo electrónico para continuar.</p>
              <Button
                onClick={async () => {
                  await Signup({
                    email: user?.email || ''
                  })
                }}
              >
                Reenviar correo
              </Button>
            </div>
          )}

          {/* Formulario de registro de correo */}
          {isLoginOrSignup === 'INIT_SESSION' && !user?.email && (
            <FormProvider {...methodsLoginOrSignup}>
              <form
                onSubmit={handleSubmitLoginOrSignup(onSubmitLoginOrSignup)}
                className="w-full p-5 rounded-lg bg-gray-50 mb-8"
                ref={loginFormRef}
              >
                <UserForm />
                <Button type="submit" disabled={!isValidLoginOrSignup}>
                  Registrar correo
                </Button>
              </form>
            </FormProvider>
          )}
          {isLoginOrSignup === 'USER_SESSION' && user?.email && (
            <div className="w-full p-5 rounded-lg" ref={userFormRef}>
              <p className="text-lg font-bold">
                Correo: <span className="text-blue-400 font-normal">{user?.email}</span>
              </p>
            </div>
          )}

          {isLoginOrSignup === 'USER_VALIDATED' ||
            (isLoginOrSignup === 'USER_SESSION' && (
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full p-5 rounded-lg bg-gray-50 mb-8"
                  ref={ubicationFormRef}
                >
                  <UbicationForm />
                  <div className="flex gap-2">
                    <Button type="submit" disabled={!isValid}>
                      Ir a pagar
                    </Button>
                  </div>
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
            ))}
        </div>
        <div className="w-full md:min-w-[50%]" ref={summaryRef}>
          <Summary
            nameDelegation={nameDelegation}
            windowSize={windowSize}
            windowType={windowType}
            paymentType={paymentType}
          />
        </div>
      </div>
    </>
  )
}
