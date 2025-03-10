import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { FiMail } from 'react-icons/fi'

const UserForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Ingresa tu correo electrónico</h2>
      <p className="text-gray-600 mb-4">
        Para continuar con tu compra, necesitamos tu correo electrónico. Si ya has realizado una compra anteriormente,
        cargaremos tus datos automáticamente.
      </p>

      <div className="mb-4 relative">
        <label className="block text-gray-700 mb-1 font-medium">Correo Electrónico</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="text-gray-400" />
          </div>
          <Input type="email" placeholder="ejemplo@correo.com" className="pl-10" {...register('email')} />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message?.toString() || 'El correo electrónico es requerido'}
          </p>
        )}
      </div>
    </>
  )
}

export default UserForm
