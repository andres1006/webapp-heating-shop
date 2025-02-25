import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  console.log('request', request.url)
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/checkout'

  console.log('token_hash', token_hash)
  console.log('type', type)
  console.log('next', next)

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash
    })

    console.log('error', error)
    if (!error) {
      // redirect user to specified redirect URL or root of app
      // TODO: get product info from cookies
      // get queryparam from cookies
      // const params = new URLSearchParams({
      //   colonia: colonia,
      //   windowType: windowType,
      //   windowSize: windowSize,
      //   paymentType: paymentType
      // })
      // redirect(`${next}?${params.toString()}`)
      redirect(`${next}`)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}
