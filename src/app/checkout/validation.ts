import { z } from 'zod'

// Validación para el número de teléfono mexicano (10 dígitos)
const phoneRegex = /^[0-9]{10}$/

// Validación para el nombre completo
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/

export const formSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres')
    .regex(nameRegex, 'El nombre solo debe contener letras y espacios')
    .refine(name => name.trim().length > 0, 'El nombre es requerido'),

  phone: z
    .string()
    .regex(phoneRegex, 'El teléfono debe tener exactamente 10 dígitos numéricos')
    .refine(phone => phone.trim().length > 0, 'El teléfono es requerido'),

  nameColonia: z
    .string()
    .min(3, 'La colonia debe tener al menos 3 caracteres')
    .max(100, 'La colonia no puede exceder los 100 caracteres')
    .refine(col => col.trim().length > 0, 'La colonia es requerida'),

  street: z
    .string()
    .min(3, 'La calle debe tener al menos 3 caracteres')
    .max(100, 'La calle no puede exceder los 100 caracteres')
    .refine(street => street.trim().length > 0, 'La calle es requerida'),

  numberExt: z
    .string()
    .min(1, 'El número exterior es requerido')
    .max(10, 'El número exterior no puede exceder los 10 caracteres'),

  numberInt: z
    .string()
    .min(1, 'El número interior es requerido')
    .max(10, 'El número interior no puede exceder los 10 caracteres'),

  reference: z
    .string()
    .max(200, 'La referencia no puede exceder los 200 caracteres')
    .optional()
    .or(z.literal(''))
})

// Validación para correo electrónico
export const formSchemaLoginOrSignup = z.object({
  email: z
    .string()
    .min(5, 'El correo electrónico es demasiado corto')
    .max(100, 'El correo electrónico es demasiado largo')
    .email('Formato de correo electrónico inválido')
    .refine(email => email.trim().length > 0, 'El correo electrónico es requerido')
    .transform(email => email.toLowerCase().trim())
})
