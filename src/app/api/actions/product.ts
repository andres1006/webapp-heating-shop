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
      return { error: 'Usuario no encontrado' }
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
      return { error: 'El usuario ya tiene un servicio creado o pendiente' }
    }

    // Intentar insertar directamente primero
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


    // Si hay un error y es de tipo RLS (PGRST301), intentar con la función RPC
    if (error) {
      console.log('Error al insertar producto directamente:', error)

      // Verificar si es un error de RLS
      if (error.code === 'PGRST301') {
        console.log('Detectado error de RLS, intentando con función RPC...')

        // Llamar a la función RPC create_product
        const { data: rpcData, error: rpcError } = await supabase.rpc('create_product', {
          p_window_type: product.windowType,
          p_window_size: product.windowSize,
          p_payment_type: product.paymentType,
          p_price: product.price,
          p_status: product.status,
          p_link_payment: product.link_payment,
          p_id_user: product.Id_user
        })

        console.log('Resultado de RPC:', rpcData)

        if (rpcError) {
          return { error: rpcError }
        }

        // Verificar si la respuesta RPC contiene un error
        if (rpcData && typeof rpcData === 'object' && 'error' in rpcData) {
          return { error: rpcData.error }
        }

        return { data: rpcData }
      }

      return { error }
    }

    return { data }
  } catch (error) {
    return { error }
  }
}
