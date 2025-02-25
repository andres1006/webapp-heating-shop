import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  colonia: z.string().optional(),
  street: z.string().optional(),
  numberExt: z.string().optional(),
  numberInt: z.string().optional(),
  reference: z.string().optional()
})

export const formSchemaLoginOrSignup = z.object({
  email: z.string().email('Correo electrónico inválido')
})
