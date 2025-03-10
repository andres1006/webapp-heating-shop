import { NextResponse, NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Actualizar la sesión de autenticación del usuario
  const supabaseResponse = await updateSession(request)

  // Redireccionar /home a / para evitar duplicidad de contenido
  // La página principal (/) ya importa el componente HomePage, por lo que
  // acceder directamente a /home sería redundante y podría causar confusión SEO
  if (request.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - archivos de imágenes (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
