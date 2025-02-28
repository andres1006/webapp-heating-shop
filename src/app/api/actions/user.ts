'use server'
import { createClient } from "@/utils/supabase/server"

export const updateUser = async (user: {
  name: string
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
    const { data, error } = await supabase.auth.updateUser({
      data: user
    })

    if (error) {
      return { error }
    }

    return { data }
  } catch (error) {
    return { error }
  }
}
