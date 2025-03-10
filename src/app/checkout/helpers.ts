'use server'

export const handleSubmit = (state: any, payload: FormData) => {
  const data = {
    name: payload.get('name') as string,
    email: payload.get('email') as string,
    phone: payload.get('phone') as string,
    colonia: payload.get('colonia') as string,
    nameDelegation: payload.get('nameDelegation') as string,
    street: payload.get('street') as string,
    numberExt: payload.get('numberExt') as string,
    numberInt: payload.get('numberInt') as string,
    reference: payload.get('reference') as string
  }
  
}
