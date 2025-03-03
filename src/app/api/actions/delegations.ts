'use server'

import { createClient } from "@/utils/supabase/server"

type delegation = {
  name: string
  clicks: number
}

export const addDelegationAndAddClisk = async (nameDelegation: string) => {
  try {
    const supabase = await createClient()

    // get delegation by name
    const { data, error } = await supabase
      .from('delegaciones')
      .select('*')
      .eq('name', nameDelegation)

    if (error) {
      return { error: error.message, status: false }
    }

    const delegation = data[0]

    if (delegation) {
      // update clicks
      const { data: updatedDelegation, error: updateError } = await supabase
        .from('delegaciones')
        .update({ clicks: delegation.clicks + 1 })
        .eq('name', nameDelegation)
        .select('*')
        .single()

      if (updateError) {
        return { error: updateError.message, status: false }
      }

      return { data: updatedDelegation, status: true }
    } else {
      // create delegation
      const { data: newDelegation, error: createError } = await supabase
        .from('delegaciones')
        .insert({ name: nameDelegation, clicks: 1 })
        .select('*')
        .single()

      if (createError) {
        return { error: createError.message }
      }

      return { data: newDelegation, status: true }
    }
  } catch (error) {
    return { error: 'Error adding delegation', status: false }
  }
}