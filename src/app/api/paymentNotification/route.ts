// creatre route for payment notification to mercadopago

import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function POST(request: NextRequest) {
  const { id, data } = await request.json()

  console.log('id', id)
  console.log('fata', data)

  // send message whatsapp to freddo
  const message = `
  Hola,
  El pago de ${data.transaction_amount} se ha realizado correctamente.
  `

  // send message whatsapp to freddo
  const response = await fetch('https://api.whatsapp.com/send?phone=573205389740&text=${message}')

  console.log('response', response)

  return NextResponse.json({ message: 'Payment notification received' })
}
