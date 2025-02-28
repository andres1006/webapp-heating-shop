import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  nameColonia: z.string().min(1, 'La colonia es requerida'),
  street: z.string().min(1, 'La calle es requerida'),
  numberExt: z.string().min(1, 'El número exterior es requerido'),
  numberInt: z.string().min(1, 'El número interior es requerido'),
  reference: z.string().optional()
})

export const formSchemaLoginOrSignup = z.object({
  email: z.string().email('Correo electrónico inválido')
})
