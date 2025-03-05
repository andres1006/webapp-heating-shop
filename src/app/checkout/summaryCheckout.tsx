'use client'
import { useState, useRef, useMemo } from 'react'
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
import { CgPaypal, CgSize } from 'react-icons/cg'
import { MdPayment, MdSummarize } from 'react-icons/md'
import { getCookie, saveDataInCookie } from '@/lib/utils'
import { Signup } from './signup'
import { User } from '@supabase/supabase-js'
import { updateUser } from '../api/actions/user'
import { createProduct } from '../api/actions/product'
import { useSequentialScrollToSection } from '@/hooks/useScrollToSection'
import FloatingLink from '@/components/FloatingLink'
import toast from 'react-hot-toast'

type OrderDetails = {
  nameDelegation: string
  windowType: string
  windowSize: string
  paymentType: string
  initUser: User | null
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

export default function StepsPage({ nameDelegation, windowType, windowSize, paymentType, initUser }: OrderDetails) {
  let user = useMemo(() => initUser, [initUser])
  const [currentStep, setCurrentStep] = useState(6)
  const [loadingValidateEmail, setLoadingValidateEmail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginOrSignup, setIsLoginOrSignup] = useState<
    'CONFIRM_EMAIL' | 'USER_SESSION' | 'USER_VALIDATED' | 'INIT_SESSION'
  >(user ? 'USER_SESSION' : 'INIT_SESSION')
  const totalSteps = 7
  const router = useRouter()

  // Calcular el monto total basado en el tipo de pago
  const totalAmount = paymentType === 'financiacion' ? 12999 : 11999

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

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true)

    try {
      // Actualizar información del usuario
      const { error: userUpdateError } = await updateUser({
        name: formData.name,
        phone: formData.phone,
        street: formData.street,
        numberExt: formData.numberExt,
        numberInt: formData.numberInt,
        reference: formData.reference,
        nameColonia: formData.nameColonia,
        nameDelegation: nameDelegation
      })

      if (userUpdateError) {
        console.error('Error al actualizar información del usuario:', userUpdateError)
        toast.error('No se pudo actualizar la información del usuario. Por favor, intenta nuevamente.')
        setIsLoading(false)
        return
      }

      // Procesar el pago
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST'
        })

        if (!response.ok) {
          const errorData = await response.json()
          toast.error(errorData.error || 'Error al procesar el pago. Por favor, intenta nuevamente.')
          setIsLoading(false)
          return
        }

        try {
          const data = await response.json()
          console.log('Respuesta del checkout:', data)

          // Guardar el client_id para referencia futura y tracking
          if (data.orderClientId) {
            localStorage.setItem('mp_client_id', data.orderClientId)
            console.log('Client ID guardado:', data.orderClientId)
          }

          if (!data?.init_point) {
            toast.error('Error al generar link de pago. Por favor, intenta nuevamente.')
            setIsLoading(false)
            return
          }

          // Crear el producto en la base de datos
          console.log('Creando producto con client_id:', data.orderClientId)

          // Asegurarnos de que el ID de usuario no sea undefined
          if (!user?.id) {
            toast.error('No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.')
            setIsLoading(false)
            return
          }

          const productData = {
            windowType,
            windowSize,
            paymentType,
            price: paymentType === 'financiacion' ? 12999 : 11999,
            status: 'pending',
            link_payment: data.init_point,
            Id_user: user.id,
            client_id: data.client_id
          }

          console.log('Datos del producto a crear:', productData)
          const { data: product, error: productError } = await createProduct(productData)

          if (productError) {
            console.error('Error al crear el producto:', productError)
            toast.error('El usuario ya tiene un producto pendiente. Por favor, intenta nuevamente.')
            setIsLoading(false)
            return
          }

          console.log('Producto creado exitosamente:', product)

          // Redirigir al usuario a la página de pago de Mercado Pago
          window.location.href = data.init_point
        } catch (error) {
          console.error('Error al crear el producto:', error)
          toast.error('No se pudo registrar el producto. Por favor, intenta nuevamente.')
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error)
        toast.error('No se pudo procesar el pago. Por favor, intenta nuevamente.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error general:', error)
      toast.error('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
      setIsLoading(false)
    }
  }

  const onSubmitLoginOrSignup = async (data: FormDataLoginOrSignup) => {
    try {
      setLoadingValidateEmail(true)
      toast.loading('Procesando solicitud...', { id: 'login' })

      const response = await Signup({
        email: data?.email?.toString() || ''
      })
      setLoadingValidateEmail(false)

      if (response.code === 'CONFIRM_EMAIL') {
        toast.success('Se ha enviado un correo de confirmación. Por favor, revisa tu bandeja de entrada.', {
          id: 'login'
        })
        methods.setValue('nameDelegation', nameDelegation)
        saveDataInCookie('nameDelegation', nameDelegation)
        saveDataInCookie('windowType', windowType)
        saveDataInCookie('windowSize', windowSize)
        saveDataInCookie('paymentType', paymentType)
        setIsLoginOrSignup(response.code)
        return
      }

      if (response.code === 'USER_SESSION') {
        toast.success('Sesión iniciada correctamente', { id: 'login' })
        methods.setValue('name', response?.data?.user?.user_metadata?.name || '')
        methods.setValue('phone', response?.data?.user?.user_metadata?.phone || '')
        methods.setValue('nameDelegation', nameDelegation || '')
        methods.setValue('street', response?.data?.user?.user_metadata?.street || '')
        methods.setValue('numberExt', response?.data?.user?.user_metadata?.numberExt || '')
        methods.setValue('numberInt', response?.data?.user?.user_metadata?.numberInt || '')
        methods.setValue('reference', response?.data?.user?.user_metadata?.reference || '')
        user = response?.data?.user || null
        setIsLoginOrSignup(response.code)
        return
      }

      if (response.code === 'ERROR') {
        toast.error('Error al procesar la solicitud', { id: 'login' })
        router.push(`/failure`)
      }
    } catch (error) {
      setLoadingValidateEmail(false)
      toast.error('Error inesperado al procesar la solicitud', { id: 'login' })
    }
  }

  return (
    <>
      {/* Enlace flotante al resumen */}
      <FloatingLink
        targetRef={summaryRef}
        label={`Pagar: ${paymentType === 'financiacion' ? '$ 10.999' : '$ 9.999'} MXN`}
        icon={<CgPaypal className="mr-2" />}
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
                <Button type="submit" disabled={!isValidLoginOrSignup || loadingValidateEmail}>
                  {loadingValidateEmail ? 'Procesando...' : 'Registrar correo'}
                </Button>
              </form>
            </FormProvider>
          )}
          {isLoginOrSignup === 'USER_SESSION' && user?.email && (
            <div className="w-full p-5 flex justify-between flex-wrap" ref={userFormRef}>
              <p className="text-lg font-bold">
                Correo: <span className="text-blue-400 font-normal">{user?.email}</span>
              </p>
              <Button
                variant="outline"
                className="my-2"
                onClick={() => {
                  setIsLoginOrSignup('INIT_SESSION')
                  methodsLoginOrSignup.setValue('email', user?.email || '')
                  user = null
                  Signup({
                    email: '',
                    signOut: true
                  })
                }}
              >
                Cambiar correo
              </Button>
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
                      {isLoading ? 'Procesando...' : 'Ir a pagar'}
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
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  )
}
