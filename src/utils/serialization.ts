import { User } from "@/app/api/createservice/route";

/**
 * Función para asegurar que un objeto sea completamente serializable
 * Convierte fechas a strings, elimina funciones, y asegura que todos los objetos sean planos
 */
export function ensureSerializable(obj: any): any {
    // Si es null o undefined, devolverlo tal cual
    if (obj === null || obj === undefined) {
        return obj;
    }

    // Si es una fecha, convertirla a string ISO
    if (obj instanceof Date) {
        return obj.toISOString();
    }

    // Si es un array, aplicar la función a cada elemento
    if (Array.isArray(obj)) {
        return obj.map(item => ensureSerializable(item));
    }

    // Si es un objeto, procesarlo
    if (typeof obj === 'object') {
        // Crear un objeto plano sin prototipo
        const result: Record<string, any> = Object.create(null);

        // Copiar todas las propiedades enumerables
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // Ignorar funciones
                if (typeof obj[key] !== 'function') {
                    result[key] = ensureSerializable(obj[key]);
                }
            }
        }

        // Convertir el objeto sin prototipo a un objeto plano normal
        return { ...result };
    }

    // Para tipos primitivos (string, number, boolean), devolverlos tal cual
    return obj;
}

/**
 * Función específica para serializar pedidos
 */
export function serializePedido(pedido: any): any {
    if (!pedido) return null;

    // Asegurarse de que el precio sea un número
    let price = typeof pedido.price === 'number' ? pedido.price : 0;

    // Crear un objeto base con valores por defecto para evitar undefined
    const pedidoBase = {
        id: pedido.id || '',
        status: pedido.status || '',
        price: price,
        created_at: null,
        updated_at: null,
        payment_date: null,
        last_updated: null,
        usuario: null
    };

    // Añadir el resto de propiedades del pedido original
    const pedidoCompleto = { ...pedidoBase, ...pedido };

    // Asegurar que sea completamente serializable
    return ensureSerializable(pedidoCompleto);
}

/**
 * Función específica para serializar usuarios
 */
export function serializeUsuario(usuario: User): any {
    if (!usuario) return null;

    // Crear un objeto base con valores por defecto para evitar undefined
    const usuarioBase = {
        id: usuario.user_id || '',
        email: usuario.email || null,
        name: usuario.name || null,
        phone: usuario.phone || null,
        street: usuario.street || null,
        numberExt: usuario.numberExt || null,
        numberInt: usuario.numberInt || null,
        reference: usuario.reference || null,
        nameColonia: usuario.nameColonia || null,
        nameDelegation: usuario.nameDelegation || null,
    };

    // Añadir el resto de propiedades del usuario original
    const usuarioCompleto = { ...usuarioBase, ...usuario };

    // Asegurar que sea completamente serializable
    return ensureSerializable(usuarioCompleto);
} 