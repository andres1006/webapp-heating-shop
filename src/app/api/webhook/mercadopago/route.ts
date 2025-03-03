import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'


// Tipos para la respuesta de la API de Mercado Pago
type MercadoPagoPayment = {
    id: number
    date_created: string
    date_approved: string
    date_last_updated: string
    money_release_date: string
    payment_method_id: string
    payment_type_id: string
    status: 'approved' | 'pending' | 'in_process' | 'rejected' | 'refunded' | 'cancelled' | 'in_mediation'
    status_detail: string
    currency_id: string
    description: string
    external_reference: string
    transaction_amount: number
    additional_info: {
        items: Array<{
            id: string
            title: string
            description: string
            category_id: string
            quantity: number
            unit_price: number
        }>
    }
}

/**
 * Maneja las notificaciones de webhook de Mercado Pago
 */
export async function POST(request: NextRequest) {
    try {
        // Obtener los datos de la notificación
        const body = await request.json()

        console.log('body', body)

        console.log('Notificación recibida de Mercado Pago:', body)

        try {
            await fetch(`https://hook.us2.make.com/e45u7bqfw9io2p4530ow2shmasmp2pk2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...body })
            })
        } catch (error) {
            console.error('Error al enviar la notificación a Make:', error)
        }


        // Verificar que sea una notificación de pago
        if (body.type !== 'payment') {
            console.log('Notificación ignorada: no es de tipo payment')
            return NextResponse.json({ message: 'Notificación recibida pero ignorada (no es de tipo payment)' }, { status: 200 })
        }

        // Obtener el ID del pago
        const paymentId = body.data.id

        if (!paymentId) {
            console.error('ID de pago no encontrado en la notificación')
            return NextResponse.json({ error: 'ID de pago no encontrado' }, { status: 400 })
        }

        /*    // Obtener los detalles del pago desde la API de Mercado Pago
           const mpAccessToken = process.env.MP_ACCESS_TOKEN
   
           if (!mpAccessToken) {
               console.error('Token de acceso de Mercado Pago no configurado')
               return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 })
           }
   
           // Consultar la API de Mercado Pago para obtener los detalles del pago
           const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
               headers: {
                   'Authorization': `Bearer ${mpAccessToken}`
               }
           })
   
           console.log('paymentResponse', paymentResponse)
   
           if (!paymentResponse.ok) {
               console.error(`Error al obtener detalles del pago ${paymentId}:`, await paymentResponse.text())
               return NextResponse.json({ error: 'Error al obtener detalles del pago' }, { status: 500 })
           }
   
           const paymentData: MercadoPagoPayment = await paymentResponse.json()
           console.log('Detalles del pago:', paymentData)
    */
        // Obtener el client_id desde external_reference (si está configurado así)
        const clientId = body.data.id

        if (!clientId) {
            console.error('No se encontró client_id en external_reference')
            return NextResponse.json({ error: 'No se pudo identificar el producto asociado al pago' }, { status: 400 })
        }

        // Conectar a Supabase
        const supabase = await createClient()

        // Buscar el producto asociado al pago
        const { data: products, error: productError } = await supabase
            .from('Product')
            .select('*')
            .eq('client_id', clientId)

        if (productError || !products || products.length === 0) {
            console.error('Error al buscar el producto:', productError || 'Producto no encontrado')
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
        }

        const product = products[0]

        // Actualizar el estado del producto según el estado del pago
        let newStatus = 'pending'

        /*  switch (paymentData.status) {
             case 'approved':
                 newStatus = 'completed'
                 break
             case 'pending':
             case 'in_process':
                 newStatus = 'pending'
                 break
             case 'rejected':
             case 'cancelled':
                 newStatus = 'cancelled'
                 break
             case 'refunded':
                 newStatus = 'refunded'
                 break
             default:
                 newStatus = 'pending'
         } */

        // Actualizar el producto en la base de datos
        const { error: updateError } = await supabase
            .from('Product')
            .update({
                status: newStatus,
                payment_status: 'paymentData.status',
                payment_status_detail: 'paymentData.status_detail',
                payment_date:  /* 'paymentData.date_approved' ||*/  null,
                last_updated: new Date().toISOString()
            })
            .eq('id', product.id)

        if (updateError) {
            console.error('Error al actualizar el producto:', updateError)
            return NextResponse.json({ error: 'Error al actualizar el estado del producto' }, { status: 500 })
        }


        return NextResponse.json({
            message: 'Notificación procesada correctamente',
            product_id: product.id,
            new_status: newStatus
        }, { status: 200 })

    } catch (error) {
        console.error('Error al procesar la notificación de Mercado Pago:', error)
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}

// También manejamos solicitudes GET para pruebas y verificación
export async function GET() {
    return NextResponse.json({
        message: 'Webhook de Mercado Pago activo',
        timestamp: new Date().toISOString()
    })
} 