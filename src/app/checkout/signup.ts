'use server'

import { createClient } from '@/utils/supabase/server'

const CODE_USER = '2otWQNGlaK7gOlVMvInQywDUpkvLEheSNUylkADlsCVS4K206y'

export const Signup = async ({ email }: { email: string }) => {
  console.log('email', email)
  const supabase = await createClient()
  const { data: existingUser } = await supabase.auth.signInWithPassword({
    email,
    password: CODE_USER
  })

  console.log('existingUser', existingUser)
  if (existingUser.user) {
    // await supabase.auth.updateUser({
    //   data: {
    //     username: 'John Agudelo',
    //     phone: '3178675309',
    //     ciudad: 'Manizales'
    //   }
    // })

    console.log('updatedUser', existingUser)

    // User already exists, handle accordingly
    return {
      code: 'USER_EXISTS',
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
    code: 'CONFIRM_EMAIL',
    data,
    error
  }
}
