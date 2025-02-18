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

export async function POST(request: NextRequest) {
  //get body from request
  const body = await request.json()

  console.log('body', body)

  return NextResponse.json({ message: 'Payment notification received' })
}
