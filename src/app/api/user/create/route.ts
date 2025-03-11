import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    try {
        const { email, nameDelegation } = await request.json()

        if (!email) {
            return NextResponse.json(
                { error: 'El correo electrónico es requerido' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // Verificar si el usuario ya existe
        const { data: existingUser, error: checkError } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single()

        if (existingUser) {
            return NextResponse.json({
                success: true,
                user: existingUser,
                message: 'El usuario ya existe'
            })
        }
        /* 
                // Crear el usuario en la tabla User
                const { data, error } = await supabase
                    .from('User')
                    .insert([
                        {
                            email,
                            nameDelegation: nameDelegation || '',
                            name: '',
                            phone: '',
                            street: '',
                            numberExt: '',
                            numberInt: '',
                            reference: '',
                            nameColonia: '',
                            role: 'user',
        
                        }
                    ])
                    .select()
        
                console.log(error)
                if (error) {
                    return NextResponse.json(
                        { error: 'Error al crear usuario', details: error.message },
                        { status: 500 }
                    )
                } */

        return NextResponse.json({
            success: true,
            user: null,
            message: 'Usuario creado exitosamente'
        })
    } catch (error: any) {

        return NextResponse.json(
            { error: 'Error interno del servidor', details: error.message },
            { status: 500 }
        )
    }
} 