'use client'
import { useState, useRef, useMemo, useEffect } from 'react'
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
import { User } from '@supabase/supabase-js'
import { updateUser, createUserTable } from '../api/actions/user'
import { createProduct } from '../api/actions/product'
import { useSequentialScrollToSection } from '@/hooks/useScrollToSection'
import FloatingLink from '@/components/FloatingLink'
import toast from 'react-hot-toast'
import { cookies } from 'next/headers'
import { getPriceByPaymentOption, formatPrice } from '@/constants'
import { setCookie, getCookie as getClientCookie, deleteCookie } from '@/utils/cookies'
import { Signup } from './signup'

type OrderDetails = {
  nameDelegation: string
  windowType: string
  windowSize: string
  paymentType: string
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

// Tipo para el usuario de la tabla User
interface UserData {
  user_id: string
  email: string
  name?: string
  phone?: string
  street?: string
  numberExt?: string
  numberInt?: string
  reference?: string
  nameColonia?: string
  nameDelegation?: string
  role?: string
}

export default function StepsPage({ nameDelegation, windowType, windowSize, paymentType }: OrderDetails) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentStep, setCurrentStep] = useState(6)
  const [loadingValidateEmail, setLoadingValidateEmail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginOrSignup, setIsLoginOrSignup] = useState<
    'CONFIRM_EMAIL' | 'USER_SESSION' | 'USER_VALIDATED' | 'INIT_SESSION'
  >('INIT_SESSION')
  const totalSteps = 7
  const router = useRouter()

  // Calcular el monto total basado en el tipo de pago
  const totalAmount = getPriceByPaymentOption(paymentType)

  // Referencias para las secciones de pasos
  const stepSectionRef = useRef<HTMLDivElement>(null)
  const userFormRef = useRef<HTMLDivElement>(null)
  const ubicationFormRef = useRef<HTMLFormElement>(null)
  const loginFormRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  // Crear un objeto de referencias para el hook de desplazamiento
  const sectionRefs = useMemo(
    () => ({
      6: userFormRef,
      7: ubicationFormRef
    }),
    []
  )

  // Utilizar el hook personalizado para el desplazamiento secuencial
  useSequentialScrollToSection(sectionRefs, currentStep, { behavior: 'smooth', block: 'center', delay: 100 })

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || '',
      phone: userData?.phone || '',
      nameDelegation: userData?.nameDelegation || nameDelegation || '',
      nameColonia: userData?.nameColonia || '',
      street: userData?.street || '',
      numberExt: userData?.numberExt || '',
      numberInt: userData?.numberInt || '',
      reference: userData?.reference || ''
    }
  })
  const {
    handleSubmit,
    formState: { errors, isValid }
  } = methods

  const methodsLoginOrSignup = useForm<FormDataLoginOrSignup>({
    resolver: zodResolver(formSchemaLoginOrSignup),
    defaultValues: {
      email: ''
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
      if (!userData?.email) {
        toast.error('No se ha identificado al usuario. Por favor, ingresa tu correo electrónico primero.')
        setIsLoading(false)
        return
      }

      console.log('userData onSubmit', userData)
      // Actualizar información del usuario en la tabla User
      const { error: userUpdateError } = await updateUser({
        user_id: userData?.user_id || '',
        email: userData?.email || '',
        name: formData?.name || '',
        phone: formData?.phone || '',
        street: formData?.street || '',
        numberExt: formData?.numberExt || '',
        numberInt: formData?.numberInt || '',
        reference: formData?.reference || '',
        nameColonia: formData?.nameColonia || '',
        nameDelegation: nameDelegation
      })

      console.log('userUpdateError', userUpdateError)
      if (userUpdateError) {
        toast.error(
          'No se pudo actualizar la información del usuario. Por favor, intenta nuevamente.' + userUpdateError
        )
        setIsLoading(false)
        return
      }

      // Guardar datos en cookies
      saveDataInCookie('nameDelegation', nameDelegation)
      saveDataInCookie('windowType', windowType)
      saveDataInCookie('windowSize', windowSize)
      saveDataInCookie('paymentType', paymentType)

      // Calcular el precio basado en el tipo de pago
      const price = getPriceByPaymentOption(paymentType)

      try {
        // Crear el producto directamente sin pasar por el checkout
        const productData = {
          windowType,
          windowSize,
          paymentType,
          price: price,
          status: 'pending',
          id_user_table: userData.user_id,
          email: userData.email
        }

        // Llamar a la API para crear el producto y generar el link de pago
        const response = await fetch('/api/checkout/direct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        })

        console.log('response', response)

        if (!response.ok) {
          const errorData = await response.json()

          toast.error(errorData.error || 'Error al procesar el pago. Por favor, intenta nuevamente.')
          setIsLoading(false)
          return
        }

        const data = await response.json()

        if (!data?.init_point) {
          toast.error('Error al generar link de pago. Por favor, intenta nuevamente.')
          setIsLoading(false)
          return
        }

        // Guardar el client_id para referencia futura y tracking
        if (data.client_id) {
          localStorage.setItem('mp_client_id', data.client_id)
        }

        // Redirigir al usuario a la página de pago de Mercado Pago
        window.location.href = data.init_point
      } catch (error) {
        toast.error('No se pudo procesar el pago. Por favor, intenta nuevamente.')
        setIsLoading(false)
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
      setIsLoading(false)
    }
  }

  const onSubmitLoginOrSignup = async (data: FormDataLoginOrSignup) => {
    try {
      setLoadingValidateEmail(true)
      toast.loading('Procesando solicitud...', { id: 'login' })

      // Verificar si el usuario existe en la tabla User
      const response = await fetch('/api/user/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email })
      })

      if (!response.ok) {
        toast.error('Error al verificar usuario. Por favor, intenta nuevamente.', { id: 'login' })
        setLoadingValidateEmail(false)
        return
      }

      const responseData = await response.json()

      console.log('responseData', responseData)
      if (responseData.exists && responseData.user) {
        // El usuario existe, guardar en cookies y actualizar estado
        setCookie('userEmail', data.email, 7)
        setUserData(responseData.user)

        // Actualizar los valores del formulario con los datos del usuario
        methods.setValue('name', responseData.user.name || '')
        methods.setValue('phone', responseData.user.phone || '')
        methods.setValue('nameDelegation', nameDelegation || '')
        methods.setValue('nameColonia', responseData.user.nameColonia || '')
        methods.setValue('street', responseData.user.street || '')
        methods.setValue('numberExt', responseData.user.numberExt || '')
        methods.setValue('numberInt', responseData.user.numberInt || '')
        methods.setValue('reference', responseData.user.reference || '')

        setIsLoginOrSignup('USER_SESSION')
        toast.success('Usuario encontrado. Por favor, completa tus datos.', { id: 'login' })

        // Avanzar al siguiente paso automáticamente
        handleNext()
      } else {
        // El usuario no existe, crear un nuevo usuario en la tabla User
        const createResponse = await fetch('/api/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email,
            nameDelegation: nameDelegation
          })
        })

        if (!createResponse.ok) {
          toast.error('Error al registrar usuario. Por favor, intenta nuevamente.', { id: 'login' })
          setLoadingValidateEmail(false)
          return
        }

        const createData = await createResponse.json()

        if (createData.success) {
          if (!createData.user) {
            toast.success('Usuario no registrado. Por favor, completa tus datos.', { id: 'login' })
            setLoadingValidateEmail(false)
            // Guardar el email en cookies
            setCookie('userEmail', data.email, 7)
            setIsLoginOrSignup('USER_SESSION')
            setUserData({
              user_id: '',
              email: data.email,
              name: '',
              phone: '',
              street: '',
              numberExt: '',
              numberInt: '',
              reference: '',
              nameColonia: '',
              nameDelegation: nameDelegation,
              role: 'user'
            })
            // Inicializar el formulario con los datos básicos
            methods.setValue('nameDelegation', nameDelegation || '')
            // Avanzar al siguiente paso automáticamente
            handleNext()
            return
          }
          // Guardar el email en cookies
          setCookie('userEmail', data.email, 7)

          // Inicializar el formulario con los datos básicos
          methods.setValue('nameDelegation', nameDelegation || '')

          setIsLoginOrSignup('USER_SESSION')
          toast.success('Usuario registrado. Por favor, completa tus datos.', { id: 'login' })

          // Avanzar al siguiente paso automáticamente
          handleNext()
        } else {
          toast.error('Error al registrar usuario. Por favor, intenta nuevamente.', { id: 'login' })
        }
      }

      // Guardar datos en cookies para mantener el estado
      saveDataInCookie('nameDelegation', nameDelegation)
      saveDataInCookie('windowType', windowType)
      saveDataInCookie('windowSize', windowSize)
      saveDataInCookie('paymentType', paymentType)

      setLoadingValidateEmail(false)
    } catch (error) {
      setLoadingValidateEmail(false)
      toast.error('Error inesperado al procesar la solicitud', { id: 'login' })
    }
  }

  // Función para cambiar el correo electrónico
  const handleChangeEmail = () => {
    // Eliminar la cookie de usuario
    deleteCookie('userEmail')

    // Limpiar el estado de usuario
    setUserData(null)

    // Volver al estado inicial de login/signup
    setIsLoginOrSignup('INIT_SESSION')

    // Limpiar el formulario de correo electrónico
    methodsLoginOrSignup.setValue('email', '')

    // Limpiar el formulario de datos personales
    methods.setValue('name', '')
    methods.setValue('phone', '')
    methods.setValue('nameDelegation', nameDelegation || '')
    methods.setValue('nameColonia', '')
    methods.setValue('street', '')
    methods.setValue('numberExt', '')
    methods.setValue('numberInt', '')
    methods.setValue('reference', '')
  }

  return (
    <>
      {/* Enlace flotante al resumen */}
      <FloatingLink
        targetRef={summaryRef}
        label={`Pagar: ${formatPrice(totalAmount)}`}
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
                    email: userData?.email || ''
                  })
                }}
              >
                Reenviar correo
              </Button>
            </div>
          )}

          {/* Formulario de registro de correo */}
          {isLoginOrSignup === 'INIT_SESSION' && (
            <FormProvider {...methodsLoginOrSignup}>
              <form
                onSubmit={handleSubmitLoginOrSignup(onSubmitLoginOrSignup)}
                className="w-full p-5 rounded-lg bg-gray-50 mb-8"
                ref={loginFormRef}
              >
                <UserForm />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!isValidLoginOrSignup || loadingValidateEmail} className="mt-4">
                    {loadingValidateEmail ? (
                      <div className="flex items-center">
                        <span className="mr-2">Procesando</span>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      'Continuar'
                    )}
                  </Button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Mostrar información del usuario y formulario de datos personales */}
          {isLoginOrSignup === 'USER_SESSION' && userData?.email && (
            <>
              <div className="w-full p-5 flex justify-between flex-wrap" ref={userFormRef}>
                <p className="text-lg font-bold">
                  Correo: <span className="text-blue-400 font-normal">{userData?.email}</span>
                </p>
                <Button variant="outline" onClick={handleChangeEmail}>
                  Cambiar correo
                </Button>
              </div>

              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full p-5 rounded-lg bg-gray-50 mb-8"
                  ref={ubicationFormRef}
                >
                  <UbicationForm />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!isValid || isLoading} className="mt-4">
                      {isLoading ? (
                        <div className="flex items-center">
                          <span className="mr-2">Procesando</span>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                      ) : (
                        'Pagar'
                      )}
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
            </>
          )}
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
