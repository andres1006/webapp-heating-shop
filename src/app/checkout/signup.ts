'use server'

import { createClient } from '@/utils/supabase/server'

const CODE_USER = '2otWQNGlaK7gOlVMvInQywDUpkvLEheSNUylkADlsCVS4K206y'

export const Signup = async ({ email, signOut = false }: { email: string, signOut?: boolean }) => {
  try {

    
    const supabase = await createClient()

    // close session
    if (signOut) {
      await supabase.auth.signOut()
      return {
        code: 'SIGN_OUT',
        data: null,
        error: null
      }
    }

    const { data: existingUser } = await supabase.auth.signInWithPassword({
      email,
      password: CODE_USER
    })

    // create user  and save in table user
    const { data: userData, error: userError } = await supabase.from('User').insert({
      email: email,
      name: existingUser.user?.user_metadata?.name || '',
      phone: existingUser.user?.user_metadata?.phone || '',
      street: existingUser.user?.user_metadata?.street || '',
      numberExt: existingUser.user?.user_metadata?.numberExt || '',
      numberInt: existingUser.user?.user_metadata?.numberInt || '',
      reference: existingUser.user?.user_metadata?.reference || ''
    }) as any

    if (userError || !userData?.id) {
      return {
        code: 'ERROR',
        data: null,
        error: userError
      }
    }

    // update auth user with id_user_table
    const { data: updateUser, error: updateUserError } = await supabase.auth.updateUser({
      data: {
        id_user_table: userData?.id || ''
      }
    })

    if (updateUserError) {
      return {
        code: 'ERROR',
        data: null,
        error: updateUserError
      }
    }

    
    if (existingUser.user) {

      

      // User already exists, handle accordingly
      return {
        code: 'USER_SESSION',
        data: existingUser,
        error: {
          message: 'User already exists. Please sign in instead.'
        }
      }
    }

    
    // If user doesn't exist, proceed with sign up
    const { data, error } = await supabase.auth.signUp({
      email,
      password: CODE_USER
    })

    // MIGHT BE SAVE ORDER IN DATABASE
    

    return {
      code: 'USER_SESSION',
      data,
      error
    }
  } catch (error) {
    return {
      code: 'ERROR',
      data: null,
      error
    }
  }
}
