// creatre route for payment notification to mercadopago

import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

// config mercadopago access token and clave secreta
/* const config = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    'APP_USR-7917833599682123-121021-f43531d4b7864edde3be7beb8ed22a77-122889697',
  clientSecret:
    process.env.MERCADO_PAGO_CLIENT_SECRET || 'd5e339984067e2bfb33c8ed801ed72418173589e562e837a603166f1321085a0'
}) */

//https://hook.us2.make.com/e45u7bqfw9io2p4530ow2shmasmp2pk2
export async function POST(request: NextRequest) {
  try {
    //get body from request
    const body = await request.json()

    console.log('body', body)



    return NextResponse.json({ message: 'Payment notification received' })
  } catch (error) {
    console.error('Error', error)
    return NextResponse.json({ message: 'Error al recibir la notificación de pago', error }, { status: 500 })
  }
}
