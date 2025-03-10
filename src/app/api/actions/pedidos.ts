'use server'

import { createClient } from "@/utils/supabase/server"
import { getUserById } from "./user"
import { serializePedido, serializeUsuario } from "@/utils/serialization"

/**
 * Obtiene todos los pedidos de la base de datos
 * @returns Lista de pedidos
 */
export async function getPedidos() {
    try {
        
        const supabase = await createClient()

        // Obtener todos los pedidos
        const { data: pedidos, error } = await supabase
            .from('Product')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            
            return []
        }

        if (!pedidos || pedidos.length === 0) {
            
            return []
        }

        

        // Procesar los precios de los pedidos
        const pedidosConPreciosCorrectos = pedidos.map(pedido => {
            let precioCorregido = pedido.price

            if (typeof pedido.price === 'string') {
                try {
                    // Limpiar el string de precio
                    const precioLimpio = pedido.price.replace(/[^\d.]/g, '')
                    precioCorregido = parseFloat(precioLimpio)

                    if (isNaN(precioCorregido)) {
                        console.warn(`Precio inválido en pedido ${pedido.id}: "${pedido.price}". Usando valor predeterminado.`)
                        // Asignar precio predeterminado según el tipo de pago
                        precioCorregido = pedido.payment_type === 'financiado' ? 12999 : 11999
                    }
                } catch (e) {
                    
                    // Asignar precio predeterminado según el tipo de pago
                    precioCorregido = pedido.payment_type === 'financiado' ? 12999 : 11999
                }
            } else if (typeof pedido.price !== 'number' || isNaN(pedido.price)) {
                console.warn(`Precio inválido en pedido ${pedido.id}: "${pedido.price}". Usando valor predeterminado.`)
                // Asignar precio predeterminado según el tipo de pago
                precioCorregido = pedido.payment_type === 'financiado' ? 12999 : 11999
            }

            // Crear un objeto con el precio corregido
            const pedidoConPrecioCorregido = {
                ...pedido,
                price: precioCorregido
            }

            // Serializar el pedido para asegurar que sea completamente serializable
            return serializePedido(pedidoConPrecioCorregido)
        })

        // Obtener información de usuario para cada pedido
        const pedidosConUsuarios = await Promise.all(
            pedidosConPreciosCorrectos.map(async (pedido) => {
                if (pedido.id_user) {
                    try {
                        
                        const usuario = await getUserById(pedido.id_user)

                        if (usuario) {
                            

                            // Serializar el usuario para asegurar que sea completamente serializable
                            const usuarioSerializable = serializeUsuario(usuario.data)

                            // Crear un nuevo objeto pedido con el usuario serializado
                            const pedidoConUsuario = {
                                ...pedido,
                                usuario: usuarioSerializable
                            }

                            // Serializar todo el pedido nuevamente para asegurar que sea completamente serializable
                            return serializePedido(pedidoConUsuario)
                        } else {
                            console.warn(`No se encontró usuario para pedido ${pedido.id} con ID: ${pedido.Id_user}`)
                            return pedido
                        }
                    } catch (error) {
                        
                        return pedido
                    }
                } else {
                    console.warn(`Pedido ${pedido.id} no tiene ID de usuario`)
                    return pedido
                }
            })
        )

        // Serializar todo el array de pedidos para asegurar que sea completamente serializable
        return JSON.parse(JSON.stringify(pedidosConUsuarios))
    } catch (error) {
        
        return []
    }
}

/**
 * Obtiene un pedido específico por su ID
 * @param id - ID del pedido
 * @returns Detalles del pedido
 */
export async function getPedidoById(id: string) {
    try {
        

        const supabase = await createClient()

        // Obtener el pedido
        const { data: pedido, error } = await supabase
            .from('Product')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            
            return null;
        }

        if (!pedido) {
            
            return null;
        }

        

        // Procesar el precio
        let precioCorregido = pedido.price;

        if (typeof pedido.price === 'string') {
            try {
                // Limpiar el string de precio
                const precioLimpio = pedido.price.replace(/[^\d.]/g, '');
                precioCorregido = parseFloat(precioLimpio);

                if (isNaN(precioCorregido)) {
                    console.warn(`Precio inválido en pedido ${id}: "${pedido.price}". Usando valor predeterminado.`);
                    // Asignar precio predeterminado según el tipo de pago
                    precioCorregido = pedido.payment_type === 'financiado' ? 12999 : 11999;
                }
            } catch (e) {
                
                // Asignar precio predeterminado según el tipo de pago
                precioCorregido = pedido.payment_type === 'financiado' ? 12999 : 11999;
            }
        } else if (typeof pedido.price !== 'number' || isNaN(pedido.price)) {
            console.warn(`Precio inválido en pedido ${id}: "${pedido.price}". Usando valor predeterminado.`);
            // Asignar precio predeterminado según el tipo de pago
            precioCorregido = pedido.payment_type === 'financiado' ? 12999 : 11999;
        }

        // Crear una copia del pedido con el precio corregido
        const pedidoConPrecioCorregido = {
            ...pedido,
            price: precioCorregido
        };

        // Serializar el pedido para asegurar que sea completamente serializable
        const pedidoSerializable = serializePedido(pedidoConPrecioCorregido);

        // Obtener información del usuario si existe un ID de usuario
        if (pedidoSerializable.id_user) {
            

            try {
                const usuario = await getUserById(pedidoSerializable.id_user);

                if (usuario) {
                    

                    // Serializar el usuario para asegurar que sea completamente serializable
                    const usuarioSerializable = serializeUsuario(usuario.data);

                    // Crear un nuevo objeto pedido con el usuario serializado
                    const pedidoConUsuario = {
                        ...pedidoSerializable,
                        usuario: usuarioSerializable
                    };

                    // Serializar todo el pedido nuevamente y convertirlo a JSON y de vuelta para eliminar cualquier prototipo
                    return JSON.parse(JSON.stringify(pedidoConUsuario));
                } else {
                    console.warn(`No se encontró el usuario con ID: ${pedidoSerializable.id_user}`);
                    return JSON.parse(JSON.stringify(pedidoSerializable));
                }
            } catch (userError) {
                
                return JSON.parse(JSON.stringify(pedidoSerializable));
            }
        } else {
            console.warn(`El pedido ${id} no tiene un ID de usuario asociado.`);
            return JSON.parse(JSON.stringify(pedidoSerializable));
        }
    } catch (error) {
        
        return null;
    }
}

/**
 * Actualiza el estado de un pedido
 * @param id - ID del pedido
 * @param status - Nuevo estado
 * @returns Resultado de la actualización
 */
export async function updatePedidoStatus(id: string, status: string) {
    try {
        if (!id) {
            return { error: { message: 'ID de pedido no proporcionado' } }
        }

        if (!status) {
            return { error: { message: 'Estado no proporcionado' } }
        }

        const supabase = await createClient()

        const { data, error } = await supabase
            .from('Product')
            .update({ status, last_updated: new Date().toISOString() })
            .eq('id', id)
            .select()

        if (error) {
            return {
                error: {
                    message: `Error al actualizar el pedido: ${error.message}`,
                    details: error
                }
            }
        }

        // Obtener información del usuario si existe
        if (data && data.length > 0 && data[0].Id_user) {
            const { data: userData, error: userError } = await getUserById(data[0].Id_user)

            if (!userError && userData) {
                return {
                    data: [{
                        ...data[0],
                        usuario: userData
                    }],
                    success: true,
                    message: 'Estado del pedido actualizado correctamente'
                }
            }
        }

        return {
            data,
            success: true,
            message: 'Estado del pedido actualizado correctamente'
        }
    } catch (error: any) {
        return {
            error: {
                message: `Error inesperado: ${error.message || 'Error desconocido'}`,
                details: error
            }
        }
    }
}

/**
 * Elimina un pedido por su ID
 * @param id - ID del pedido
 * @returns Resultado de la eliminación
 */
export async function deletePedido(id: string) {
    try {
        if (!id) {
            return { error: { message: 'ID de pedido no proporcionado' } }
        }

        const supabase = await createClient()

        // Primero obtenemos el pedido para verificar que existe
        const { data: pedido, error: errorConsulta } = await supabase
            .from('Product')
            .select('*')
            .eq('id', id)
            .single()

        if (errorConsulta) {
            return {
                error: {
                    message: `Error al verificar el pedido: ${errorConsulta.message}`,
                    details: errorConsulta
                }
            }
        }

        if (!pedido) {
            return { error: { message: 'El pedido no existe' } }
        }

        // Eliminamos el pedido
        const { error } = await supabase
            .from('Product')
            .delete()
            .eq('id', id)

        if (error) {
            return {
                error: {
                    message: `Error al eliminar el pedido: ${error.message}`,
                    details: error
                }
            }
        }

        return {
            success: true,
            message: 'Pedido eliminado correctamente'
        }
    } catch (error: any) {
        return {
            error: {
                message: `Error inesperado: ${error.message || 'Error desconocido'}`,
                details: error
            }
        }
    }
}

/**
 * Actualiza el estado de un pedido por client_id
 * @param client_id - ID del cliente generado para el pedido
 * @param status - Nuevo estado del pedido
 * @returns Resultado de la actualización
 */
export async function updatePedidoByClientId(client_id: string, status: string) {
    try {
        

        if (!client_id) {
            
            return null;
        }

        const supabase = await createClient();

        // Buscar el pedido por client_id
        const { data: pedido, error: searchError } = await supabase
            .from('Product')
            .select('*')
            .eq('client_id', client_id)
            .single();

        if (searchError) {
            
            return null;
        }

        if (!pedido) {
            
            return null;
        }

        

        // Actualizar el estado del pedido
        const { data, error } = await supabase
            .from('Product')
            .update({ status })
            .eq('client_id', client_id)
            .select();

        if (error) {
            
            return null;
        }

        
        return data;
    } catch (error) {
        
        return null;
    }
} 