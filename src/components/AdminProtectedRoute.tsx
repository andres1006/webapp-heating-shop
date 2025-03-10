'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from './ui/loading-spinner'
import { createClient } from '@/utils/supabase/client'
import { getCookie } from '@/utils/cookies'
import { isAdmin } from '@/app/api/actions/user'

interface AdminProtectedRouteProps {
  children: React.ReactNode
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar si existe la cookie de administrador
        const adminEmail = getCookie('adminEmail')

        if (!adminEmail) {
          
          router.push('/admin')
          return
        }

        // Verificar si el usuario es administrador en la tabla User
        const adminStatus = await isAdmin(adminEmail)

        if (!adminStatus) {
          
          router.push('/admin')
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        
        router.push('/admin')
      }
    }

    checkAuth()
  }, [router])

  // Mostrar spinner mientras se verifica la autenticación
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Si está autenticado, mostrar el contenido
  return isAuthenticated ? <>{children}</> : null
}
