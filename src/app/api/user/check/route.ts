import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        

        if (!email) {
            return NextResponse.json(
                { error: 'El correo electrónico es requerido' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // Buscar el usuario en la tabla User por su email
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single()

        if (error && error.code !== 'PGRST116') {
            
            return NextResponse.json(
                { error: 'Error al buscar usuario' },
                { status: 500 }
            )
        }

        

        // Si el usuario existe, devolver sus datos
        if (data) {
            return NextResponse.json({
                exists: true,
                user: data
            })
        }

        // Si el usuario no existe, devolver false
        return NextResponse.json({
            exists: false
        })
    } catch (error) {
        
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
} 