// pages/api/createService.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabaseClient'

// types.ts
export interface User {
  user_id: number
  name: string
  email: string
  phone?: string
  status: string
  created_at: string
  street?: string
  numberExt?: string
  numberInt?: string
  reference?: string
  nameColonia?: string
  nameDelegation?: string
}

export interface Service {
  service_id: number
  user_id: number
  window_type: string
  colonia: string
  installation_address: string
  reference?: string
  installation_date: string
  payment_method: string
  status: string
  total_amount: number
  created_at: string
}

export interface Payment {
  payment_id: number
  service_id: number
  payment_method: string
  transaction_id?: string
  mercadopago_status?: string
  mercadopago_detail?: string
  amount: number
  created_at: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /*   if (req.method === 'POST') {
    const {
      userId,
      windowType,
      colonia,
      installationAddress,
      reference,
      installationDate,
      paymentMethod,
      totalAmount
    } = req.body

    try {
      // Insertar un nuevo servicio
      const { data: serviceData, error: serviceError } = await supabase
        .from('Service')
        .insert([
          {
            user_id: userId,
            window_type: windowType,
            colonia,
            installation_address: installationAddress,
            reference,
            installation_date: installationDate,
            payment_method: paymentMethod,
            total_amount: totalAmount,
            status: 'pendiente',
            created_at: new Date().toISOString()
          }
        ])
        .single()

      if (serviceError) throw serviceError

      // Insertar un pago asociado al servicio
      const { data: paymentData, error: paymentError } = await supabase
        .from('Payment')
        .insert([
          {
            service_id: (serviceData as any).service_id,
            payment_method: paymentMethod,
            amount: totalAmount,
            created_at: new Date().toISOString()
          }
        ])
        .single()

      if (paymentError) throw paymentError

      res.status(200).json({ service: serviceData, payment: paymentData })
    } catch (error) {
      
      res.status(500).json({ error: 'Error al crear el servicio y el pago' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } */
}
