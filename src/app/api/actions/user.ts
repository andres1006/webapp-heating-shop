'use server'
import { createClient } from "@/utils/supabase/server"

export const updateUser = async (user: {
  user_id?: string
  name: string
  email: string
  phone: string
  street: string
  numberExt: string
  numberInt: string
  reference: string
  nameColonia: string
  nameDelegation: string
}) => {
  try {
    const supabase = await createClient()


    // check if user exists in supabase
    const { data: userData, error: userError } = await supabase.from('User').select('*').eq('user_id', user.user_id) as any

    

    if (userError) {
      return { error: userError }
    }

    let dataUser = null
    if (userData) {
      // update table user in supabase  
      const { data, error } = await supabase.from('User').update({
        name: user.name,
        phone: user.phone,
        street: user.street,
        numberExt: user.numberExt,
        numberInt: user.numberInt,
        reference: user.reference,
        nameColonia: user.nameColonia,
        nameDelegation: user.nameDelegation
      }).eq('user_id', user.user_id) as any

      if (error) {
        return { error }
      }
      dataUser = data
    } else {
      // create table user in supabase
      const { data, error } = await supabase.from('User').insert({
        name: user.name,
        phone: user.phone,
        street: user.street,
        numberExt: user.numberExt,
        numberInt: user.numberInt,
        reference: user.reference,
        nameColonia: user.nameColonia,
        nameDelegation: user.nameDelegation
      }) as any

      if (error) {
        return { error }
      }
      dataUser = data
    }

    


    const { data: usetAuthData, error: usetAuthError } = await updateUserAuth({
      name: user.name,
      phone: user.phone,
      street: user.street,
      numberExt: user.numberExt,
      numberInt: user.numberInt,
      reference: user.reference,
      nameColonia: user.nameColonia,
      nameDelegation: user.nameDelegation,
      id_user_table: dataUser?.id || ''
    })


    if (usetAuthError) {
      return { error: usetAuthError }
    }


    return { data: usetAuthData }
  } catch (error) {
    return { error }
  }
}

export const updateUserAuth = async (user: {
  name: string
  phone: string
  street: string
  numberExt: string
  numberInt: string
  reference: string
  nameColonia: string
  nameDelegation: string
  id_user_table: string
}) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.updateUser({
    data: user
  })

  return { data, error }
}


export const createUserTable = async (user: {
  email: string
  name: string
  phone: string
  street: string
  numberExt: string
  numberInt: string
  reference: string
  nameColonia: string
  nameDelegation: string
}) => {
  const supabase = await createClient()

  // validate if user exists in supabase table
  const { data: userData, error: userError } = await supabase.from('User').select('*').eq('email', user.email)

  if (userError) {
    return { error: userError }
  }

  if (userData) {
    return { data: userData[0] }
  }


  const { data, error } = await supabase.from('User').insert({
    email: user.email,
    name: user.name,
    phone: user.phone,
    street: user.street,
    numberExt: user.numberExt,
    numberInt: user.numberInt,
    reference: user.reference,
    nameColonia: user.nameColonia,
    nameDelegation: user.nameDelegation,
  }).select('id').single()

  return { data, error }
}




export const getUserById = async (id: string) => {
  const supabase = await createClient()
  // get user by id table user  
  const { data, error } = await supabase.from('User').select('*').eq('user_id', id).single() as any
  return { data, error }
}

/**
 * Verifica si un usuario es administrador
 * @param email - Email del usuario
 * @returns true si el usuario es administrador, false en caso contrario
 */
export async function isAdmin(email: string): Promise<boolean> {
  try {
    if (!email) {
      
      return false;
    }

    
    const supabase = await createClient();

    // Obtener el usuario de la tabla User
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      
      return false;
    }

    // Verificar si el usuario tiene el rol de administrador
    const isAdmin = data.role === 'admin';
    

    return isAdmin;
  } catch (error: any) {
    
    return false;
  }
}

/**
 * Verifica las credenciales de un usuario administrador
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 * @returns Objeto con el resultado de la verificación
 */
export async function verifyAdminCredentials(email: string, password: string): Promise<{
  success: boolean;
  user?: any;
  message?: string
}> {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: 'Email y contraseña son requeridos'
      };
    }

    const supabase = await createClient();

    // Obtener el usuario de la tabla User
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }

    // Verificar si el usuario tiene el rol de administrador
    if (data.role !== 'admin') {
      return {
        success: false,
        message: 'El usuario no tiene permisos de administrador'
      };
    }

    // Verificar la contraseña (en una implementación real, deberías usar hash)
    // Aquí asumimos que la contraseña está almacenada en la tabla User
    if (data.password !== password) {
      return {
        success: false,
        message: 'Contraseña incorrecta'
      };
    }

    // Eliminar la contraseña del objeto de usuario antes de devolverlo
    const { password: _, ...userWithoutPassword } = data;

    return {
      success: true,
      user: userWithoutPassword
    };
  } catch (error: any) {
    
    return {
      success: false,
      message: 'Error al verificar credenciales'
    };
  }
}

/**
 * Crea un usuario administrador en la tabla User
 * @param user - Datos del usuario administrador
 * @returns Objeto con el resultado de la operación
 */
export async function createAdminUser(user: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}): Promise<{
  success: boolean;
  user?: any;
  message?: string
}> {
  try {
    if (!user.email || !user.password || !user.name) {
      return {
        success: false,
        message: 'Email, contraseña y nombre son requeridos'
      };
    }

    const supabase = await createClient();

    // Verificar si ya existe un usuario con ese email
    const { data: existingUser, error: checkError } = await supabase
      .from('User')
      .select('*')
      .eq('email', user.email)
      .single();

    if (existingUser) {
      return {
        success: false,
        message: 'Ya existe un usuario con ese email'
      };
    }

    // Crear el usuario en la tabla User
    const { data, error } = await supabase
      .from('User')
      .insert({
        email: user.email,
        password: user.password, // En una implementación real, deberías usar hash
        name: user.name,
        phone: user.phone || '',
        role: 'admin' // Asignar rol de administrador
      })
      .select()
      .single();

    if (error) {
      
      return {
        success: false,
        message: `Error al crear usuario: ${error.message}`
      };
    }

    // Eliminar la contraseña del objeto de usuario antes de devolverlo
    const { password: _, ...userWithoutPassword } = data;

    return {
      success: true,
      user: userWithoutPassword,
      message: 'Usuario administrador creado con éxito'
    };
  } catch (error: any) {
    
    return {
      success: false,
      message: 'Error al crear usuario administrador'
    };
  }
}

