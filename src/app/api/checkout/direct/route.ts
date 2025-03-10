import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { v4 as uuidv4 } from 'uuid'
import { createClient } from '@/utils/supabase/server'
import {
    getPriceByPaymentOption,
    getInstallmentsByPaymentOption
} from '@/constants'

// Configuración de MercadoPago
const ACCESS_TOKEN = 'APP_USR-7917833599682123-121021-f43531d4b7864edde3be7beb8ed22a77-122889697'
const mercadopago = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN || '' })

const descriptionMessage = {
    batiente: 'Servicio de instalación aire acondicionado, para ventana batiente',
    abatible: 'Servicio de instalación aire acondicionado, para ventana abatible',
    corrediza: 'Servicio de instalación aire acondicionado, para ventana corrediza'
}

export async function POST(req: Request) {
    try {
        // Obtener los datos del producto del cuerpo de la solicitud
        const productData = await req.json()

        // Validar que se proporcionen todos los datos necesarios
        const { windowType, windowSize, paymentType, email } = productData

        if (!windowType || !windowSize || !paymentType || !email) {
            return NextResponse.json({
                error: 'Faltan datos requeridos para crear el producto'
            }, { status: 400 })
        }

        // Obtener el precio correcto según la opción de pago
        const price = getPriceByPaymentOption(paymentType)

        // Obtener el usuario de la tabla User
        const supabase = await createClient()
        const { data: userData, error: userError } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single()

        if (userError || !userData) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
        }

        // Generar un ID único para este pedido
        const orderClientId = uuidv4()

        // Descripción del producto
        const description = descriptionMessage[windowType as keyof typeof descriptionMessage]
        const title = descriptionMessage[windowType as keyof typeof descriptionMessage]

        try {
            // Crear la preferencia de pago en Mercado Pago
            const preference = await new Preference(mercadopago).create({
                body: {
                    items: [
                        {
                            id: uuidv4(),
                            title,
                            description,
                            unit_price: Number(price),
                            quantity: 1,
                        }
                    ],
                    payer: {
                        email: email,
                        name: userData.name || 'Cliente',
                        phone: {
                            number: userData.phone || ''
                        }
                    },
                    back_urls: {
                        success: `${process.env.NEXT_PUBLIC_URL}/success`,
                        failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
                        pending: `${process.env.NEXT_PUBLIC_URL}/pending`,
                    },
                    auto_return: 'approved',
                    payment_methods: {
                        default_installments: getInstallmentsByPaymentOption(paymentType),
                        installments: 24 // Número máximo de cuotas permitidas
                    },
                    external_reference: orderClientId,
                    notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhook/mercadopago`
                }
            })

            // Crear el producto en la base de datos
            const { data: product, error: productError } = await supabase
                .from('Product')
                .insert([
                    {
                        windowType,
                        windowSize,
                        paymentType,
                        price,
                        status: 'pending',
                        link_payment: preference.init_point,
                        id_user: userData.user_id,
                        id_user_table: userData.user_id,
                        client_id: orderClientId
                    },
                ])
                .select()

            if (productError) {
                return NextResponse.json({
                    error: 'Error al crear el producto',
                    details: productError.message
                }, { status: 500 })
            }

            // Devolver el link de pago y el client_id
            return NextResponse.json({
                init_point: preference.init_point,
                client_id: orderClientId,
                product_id: product[0]?.id
            })

        } catch (error: any) {
            return NextResponse.json({
                error: 'Error al crear la preferencia de pago',
                details: error.message
            }, { status: 500 })
        }

    } catch (error: any) {
        return NextResponse.json({
            error: 'Error interno del servidor',
            details: error.message
        }, { status: 500 })
    }
} 