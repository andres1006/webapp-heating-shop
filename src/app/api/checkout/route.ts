import { NextApiRequest, NextApiResponse } from 'next'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import {
  APLICATION_ID_ONE_SIGNAL,
  emailSoporteFreddo,
  PRICE_INSTALLATION_CONTADO,
  PRICE_INSTALLATION_FINANCIADO
} from '@/constants'
import { URL_ONE_SIGNAL } from '@/constants'
import { createClient } from '@/utils/supabase/server'

const PUBLIC_APP_USR = 'APP_USR-c6ae916f-2116-460e-a92b-bdb05d79630f'
// Micke
//const ACCESS_TOKEN = 'APP_USR-7917833599682123-121021-f43531d4b7864edde3be7beb8ed22a77-122889697'
// Pipe
//const ACCESS_TOKEN = 'APP_USR-5065090835942230-010822-4a4d9911d4bb86a3fdb6590869108666-308042976'
const PUBLIC_KEY = 'APP_USR-078dd8e0-437a-4bc2-b81e-3fb0e8fd5f0c'
const CLIENT_ID = '7917833599682123'
const CLIENT_SECRET = 'LAdObjRazoj0C6NtSVO9c6oJckEhRORL'

const descriptionMessage = {
  batiente: 'Servicio de instalación aire acondicionado, para ventana batiente',
  abatible: 'Servicio de instalación aire acondicionado, para ventana abatible',
  corrediza: 'Servicio de instalación aire acondicionado, para ventana corrediza'
}

// Configura el SDK de MercadoPago
export const mercadopago = new MercadoPagoConfig({ accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN || '' })

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''

  // get user session from request
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

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
  const totalAmount = paymentType === 'financiacion' ? 12999 : PRICE_INSTALLATION_CONTADO

  if (colonia === '' || windowType === '' || windowSize === '' || paymentType === '') {
    return NextResponse.json({ error: 'Datos incompletos' })
  }

  const description = descriptionMessage[windowType as keyof typeof descriptionMessage]
  const title = descriptionMessage[windowType as keyof typeof descriptionMessage]

  if (req.method === 'POST') {
    try {
      // Generar un ID único para este pedido que usaremos como external_reference
      const orderClientId = uuidv4()

      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: uuidv4(),
              title,
              description,
              unit_price: Number(totalAmount),
              quantity: 1,
            }
          ],
          payer: {
            email: user?.email,
            name: user?.user_metadata?.name,
            phone: {
              number: user?.user_metadata?.phone
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
          // Usar el ID único como external_reference para poder identificar este pedido en las notificaciones
          external_reference: orderClientId,
          // Actualizar la URL de notificación para usar nuestro nuevo webhook
          notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhook/mercadopago`
        }
      })

      /* const response = await sendNotification() */
      console.log('preference', preference)

      // Devolver el client_id generado por nosotros, no el de la preferencia
      return NextResponse.json({
        init_point: preference.init_point,
        client_id: orderClientId
      })
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error)
      return NextResponse.json({ error: 'Error al crear la preferencia de pago' })
    }
  }
}

