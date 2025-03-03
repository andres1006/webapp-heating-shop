'use server'

import { createClient } from '@/utils/supabase/server'

const CODE_USER = '2otWQNGlaK7gOlVMvInQywDUpkvLEheSNUylkADlsCVS4K206y'

export const Signup = async ({ email, signOut = false }: { email: string, signOut?: boolean }) => {
  try {

    console.log('email', email)
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

    console.log('existingUser', existingUser)
    if (existingUser.user) {

      console.log('updatedUser', existingUser)

      // User already exists, handle accordingly
      return {
        code: 'USER_SESSION',
        data: existingUser,
        error: {
          message: 'User already exists. Please sign in instead.'
        }
      }
    }

    console.log('signing up')
    // If user doesn't exist, proceed with sign up
    const { data, error } = await supabase.auth.signUp({
      email,
      password: CODE_USER
    })

    // MIGHT BE SAVE ORDER IN DATABASE
    console.log('data', data)

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
