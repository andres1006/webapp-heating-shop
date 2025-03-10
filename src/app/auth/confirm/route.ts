'use server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { PRICE_INSTALLATION_CONTADO } from '@/constants'
import { PRICE_INSTALLATION_FINANCIADO } from '@/constants'

export async function GET(request: NextRequest) {
  
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/checkout'

  
  
  

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash
    })

    
    if (!error) {
      // redirect user to specified redirect URL or root of app
      // TODO: get product info from cookies
      // get queryparam from cookies
      // get cockies server 
      const cookies: any = request.cookies

      // read cookies
      const colonia = cookies?._parsed?.get('colonia')?.value || ''
      const windowType = cookies?._parsed?.get('windowType')?.value || ''
      const windowSize = cookies?._parsed?.get('windowSize')?.value || ''
      const paymentType = cookies?._parsed?.get('paymentType')?.value || ''

      const params = new URLSearchParams({
        colonia: colonia,
        windowType: windowType,
        windowSize: windowSize,
        paymentType: paymentType
      })
      redirect(`${next}?${params.toString()}`)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}
