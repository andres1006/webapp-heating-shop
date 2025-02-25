import { NextApiRequest, NextApiResponse } from 'next'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import {
  APLICATION_ID_ONE_SIGNAL,
  emailSoporteFreddo,
  KEY_ONE_SIGNAL,
  PRICE_INSTALLATION_CONTADO,
  PRICE_INSTALLATION_FINANCIADO
} from '@/constants'
import { URL_ONE_SIGNAL } from '@/constants'

const PUBLIC_APP_USR = 'APP_USR-c6ae916f-2116-460e-a92b-bdb05d79630f'
// Micke
const ACCESS_TOKEN = 'APP_USR-7917833599682123-121021-f43531d4b7864edde3be7beb8ed22a77-122889697'
// Pipe
//const ACCESS_TOKEN = 'TEST-6095836766125645-010917-31ec1781ab40bd4da7be2931a00c0f80-308042976'
const PUBLIC_KEY = 'APP_USR-078dd8e0-437a-4bc2-b81e-3fb0e8fd5f0c'
const CLIENT_ID = '7917833599682123'
const CLIENT_SECRET = 'LAdObjRazoj0C6NtSVO9c6oJckEhRORL'

const descriptionMessage = {
  batiente: 'Servicio de instalación aire acondicionado, para ventana batiente',
  abatible: 'Servicio de instalación aire acondicionado, para ventana abatible',
  corrediza: 'Servicio de instalación aire acondicionado, para ventana corrediza'
}

const title = 'Servicio de instalación de aire acondicionado'

// Configura el SDK de MercadoPago
export const mercadopago = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN })

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''

  // get cookies from request
  const cookies: any = req.cookies

  // read cookies
  const colonia = cookies?._parsed?.get('colonia')?.value || ''
  const windowType = cookies?._parsed?.get('windowType')?.value || ''
  const windowSize = cookies?._parsed?.get('windowSize')?.value || ''
  const paymentType = cookies?._parsed?.get('paymentType')?.value || ''
  const email = cookies?._parsed?.get('email')?.value || ''
  const name = cookies?._parsed?.get('name')?.value || ''
  const phone = cookies?._parsed?.get('phone')?.value || ''
  const totalAmount = paymentType === 'financiacion' ? PRICE_INSTALLATION_FINANCIADO : PRICE_INSTALLATION_CONTADO

  if (colonia === '' || windowType === '' || windowSize === '' || paymentType === '' || email === '') {
    return NextResponse.json({ error: 'Datos incompletos' })
  }

  const description = descriptionMessage[windowType as keyof typeof descriptionMessage]

  if (req.method === 'POST') {
    try {
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: uuidv4(),
              title,
              description,
              unit_price: Number(totalAmount),
              quantity: 1
            }
          ],
          payer: {
            email: email,
            name: name,
            phone: {
              number: phone
            }
          },
          back_urls: {
            success: `${process.env.NEXT_PUBLIC_URL}/success`,
            failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
            pending: `${process.env.NEXT_PUBLIC_URL}/pending`
          },
          auto_return: 'approved',
          payment_methods: {
            installments: 12 // Número máximo de cuotas permitidas
          },
          notification_url: `${process.env.NEXT_PUBLIC_URL}/api/checkout/notification`
        }
      })

      /* const response = await sendNotification() */

      return NextResponse.json({ init_point: preference.init_point })
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error)
      return NextResponse.json({ error: 'Error al crear la preferencia de pago' })
    }
  }
}

const sendNotification = async () => {
  try {
    const response = await fetch('https://api.onesignal.com/notifications?c=email', {
      method: 'POST',
      headers: {
        Authorization: `Key ${KEY_ONE_SIGNAL}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        content_type: 'application/json'
      },
      body: JSON.stringify({
        app_id: APLICATION_ID_ONE_SIGNAL,
        email_subject: 'Servicio de instalación de aire acondicionado',
        email_preheader: 'Servicio de instalación de aire acondicionado',
        email_body: '<html>Welcome to Cat Facts</html>',
        email_from_name: 'Cat Facts',
        email_from_address: emailSoporteFreddo,
        email_reply_to_address: 'andresagudelo1006@gmail.com'
      })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return { error: 'Error fetching data' }
  }
}
