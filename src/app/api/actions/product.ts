'use server'

import { createClient } from "@/utils/supabase/server"
import { getPriceByPaymentOption } from "@/constants"

export const createProduct = async (product: {
  windowType: string
  windowSize: string
  paymentType: string
  price: number
  status: string
  link_payment: string
  Id_user: string,
  client_id: string,
  id_user_table: string
}) => {
  try {
    if (!product?.id_user_table) {
      return {
        error: 'Usuario no encontrado',
        details: 'Se requiere un ID de usuario válido para crear un producto'
      }
    }

    // Validar campos obligatorios
    const requiredFields = ['windowType', 'windowSize', 'paymentType', 'status'];
    const missingFields = requiredFields.filter(field => !product[field as keyof typeof product]);

    if (missingFields.length > 0) {
      return {
        error: 'Campos requeridos faltantes',
        details: `Los siguientes campos son obligatorios: ${missingFields.join(', ')}`
      };
    }

    // Obtener el precio correcto según la opción de pago
    const price = getPriceByPaymentOption(product.paymentType);
    

    // Crear cliente de Supabase
    const supabase = await createClient()

    /*     // Verificar si el producto ya existe con el usuario y estado pendiente
        const { data: productData, error: productError } = await supabase
          .from('Product')
          .select('*')
          .eq('Id_user', product?.Id_user)
          .eq('status', 'pending')
    
        if (productError) {
          return {
            error: 'Error al verificar productos existentes',
            details: productError.message
          }
        }
    
        if (productData && productData.length > 0) {
          return {
            error: 'Producto existente',
            details: 'El usuario ya tiene un servicio creado o pendiente',
            productId: productData[0].id
          }
        } */

    // Intentar insertar el producto
    const { data, error } = await supabase
      .from('Product')
      .insert([
        {
          windowType: product?.windowType,
          windowSize: product?.windowSize,
          paymentType: product?.paymentType,
          price: price,
          status: product?.status,
          link_payment: product?.link_payment,
          Id_user_table: product?.id_user_table,
          client_id: product?.client_id
        },
      ])
      .select()

    // Manejar errores de inserción
    if (error) {
      return {
        error: 'Error al crear el producto',
        details: error.message,
        code: error.code
      }
    }

    
    

    return {
      data,
      success: true,
      message: 'Producto creado exitosamente'
    }
  } catch (error: any) {
    return {
      error: 'Error inesperado',
      details: error?.message || 'Ocurrió un error al procesar la solicitud'
    }
  }
}
