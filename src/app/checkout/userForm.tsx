import { Input } from '@/components/ui/input'

import { useFormContext } from 'react-hook-form'

const UserForm = () => {
  const { register } = useFormContext()
  return (
    <>
      <h2 className=" w-full text-xl font-semibold mb-4">Datos del Usuario</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Correo Electrónico</label>
        <Input type="email" placeholder="example@example.com" required {...register('email')} />
      </div>
    </>
  )
}

export default UserForm
