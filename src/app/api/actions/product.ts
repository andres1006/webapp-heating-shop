'use server'

import { createClient } from "@/utils/supabase/server"

export const createProduct = async (product: {
  windowType: string
  windowSize: string
  paymentType: string
  price: number
  status: string
  link_payment: string
  Id_user: string,
  client_id: string
}) => {
  try {
    if (!product?.Id_user) {
      return { error: 'User not found' }
    }

    // validate if the product already exists witch user and status is pending
    const supabase = await createClient()

    const { data: productData, error: productError } = await supabase
      .from('Product')
      .select('*')
      .eq('Id_user', product?.Id_user)
      .eq('status', 'pending')

    console.log('productData', productData)
    if (productData && productData.length > 0) {
      return { error: 'Ya hay un pedido pendiente para este usuario' }
    }

    const { data, error } = await supabase
      .from('Product')
      .insert([
        {
          windowType: product?.windowType,
          windowSize: product?.windowSize,
          paymentType: product?.paymentType,
          price: product?.price,
          status: product?.status,
          link_payment: product?.link_payment,
          Id_user: product?.Id_user,
          client_id: product?.client_id
        },
      ])
      .select()

    console.log('data', data)
    console.log('error', error)
    if (error) {
      return { error }
    }

    return { data }
  } catch (error) {
    console.log('error', error)
    return { error }
  }
}
