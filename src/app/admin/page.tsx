'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loading-button'
import { useTranslation } from '@/i18n/useTranslation'
import { createClient } from '@/utils/supabase/client'
import { setCookie, getCookie, deleteCookie } from '@/utils/cookies'
import { verifyAdminCredentials } from '@/app/api/actions/user'

export default function AdminPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showChangeEmail, setShowChangeEmail] = useState(false)

  // Verificar si ya está autenticado al cargar la página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar si existe la cookie de administrador
        const adminEmail = getCookie('adminEmail')

        if (adminEmail) {
          setEmail(adminEmail)
          setIsAuthenticated(true)
          setShowChangeEmail(true)
        }
      } catch (error) {
        
      }
    }

    checkAuth()
  }, [])

  // Función para verificar las credenciales
  const handleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Verificar las credenciales del administrador
      const result = await verifyAdminCredentials(email, password)

      if (result.success && result.user) {
        // Guardar el email del administrador en una cookie (7 días de duración)
        setCookie('adminEmail', email, 7)

        setIsAuthenticated(true)
        router.push('/admin/pedidos')
      } else {
        setError(result.message || 'Credenciales incorrectas')
      }
    } catch (error) {
      
      setError('Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  // Función para cambiar el correo
  const handleChangeEmail = () => {
    deleteCookie('adminEmail')
    setIsAuthenticated(false)
    setShowChangeEmail(false)
    setEmail('')
    setPassword('')
  }

  // Si ya está autenticado, redirigir a la página de pedidos
  useEffect(() => {
    if (isAuthenticated && !showChangeEmail) {
      router.push('/admin/pedidos')
    }
  }, [isAuthenticated, router, showChangeEmail])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="mt-2 text-gray-600">
            {showChangeEmail ? `Sesión iniciada como ${email}` : 'Ingresa tus credenciales para acceder'}
          </p>
        </div>

        {showChangeEmail ? (
          <div className="mt-8 space-y-6">
            <Button onClick={handleChangeEmail} className="w-full" variant="outline">
              Cambiar correo electrónico
            </Button>
            <Button onClick={() => router.push('/admin/pedidos')} className="w-full">
              Ir a Pedidos
            </Button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="Ingresa tu contraseña"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <LoadingButton isLoading={isLoading} onClick={handleLogin} className="w-full">
              Acceder
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  )
}
