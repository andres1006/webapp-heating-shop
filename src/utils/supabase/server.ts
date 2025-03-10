import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Crea un cliente de Supabase para el servidor
 * @returns Cliente de Supabase
 */
export async function createClient() {
  const cookieStore = await cookies()

  // Verificar que las variables de entorno estén definidas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Las variables de entorno de Supabase no están definidas')
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch (error) {
          // La función setAll fue llamada desde un Server Component.
          // Esto puede ignorarse si tienes un middleware que actualiza
          // las sesiones de usuario.
          console.warn('No se pudieron establecer cookies desde un Server Component', error)
        }
      }
    },
    // Opciones adicionales para mejorar la seguridad y el rendimiento
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  })
}
