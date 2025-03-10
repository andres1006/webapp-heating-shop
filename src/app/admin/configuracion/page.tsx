'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/ui/loading-button'
import { useTranslation } from '@/i18n/useTranslation'
import { createAdminUser } from '@/app/api/actions/user'
import { getCookie } from '@/utils/cookies'
import AdminProtectedRoute from '@/components/AdminProtectedRoute'

export default function ConfiguracionPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Verificar si ya está autenticado al cargar la página
  useEffect(() => {
    const adminEmail = getCookie('adminEmail')
    if (!adminEmail) {
      router.push('/admin')
    }
  }, [router])

  // Función para crear un usuario administrador
  const handleCreateAdmin = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validaciones básicas
    if (!email || !password || !name) {
      setError('Todos los campos son obligatorios')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    try {
      // Crear el usuario administrador
      const result = await createAdminUser({
        email,
        password,
        name,
        phone
      })

      if (result.success) {
        setSuccess(result.message || 'Usuario administrador creado con éxito')
        // Limpiar el formulario
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setName('')
        setPhone('')
      } else {
        setError(result.message || 'Error al crear usuario administrador')
      }
    } catch (error) {
      
      setError('Error al crear usuario administrador')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Configuración de Administrador</h1>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Crear Usuario Administrador</h2>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>
          )}

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono (opcional)
              </label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Número de teléfono"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
              />
            </div>

            <div className="pt-4">
              <LoadingButton isLoading={isLoading} onClick={handleCreateAdmin} className="w-full">
                Crear Administrador
              </LoadingButton>
            </div>

            <div className="pt-2">
              <Button variant="outline" onClick={() => router.push('/admin/pedidos')} className="w-full">
                Volver a Pedidos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
