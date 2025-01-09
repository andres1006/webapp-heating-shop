import { Input } from '@/components/ui/input'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

interface UbicationFormProps {}

const UbicationForm: FC<UbicationFormProps> = () => {
  const { register, watch } = useFormContext()

  const name = watch('name')
  const email = watch('email')
  const phone = watch('phone')

  if (!name || !email || !phone) return null

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {name}, <span className="text-gray-500 font-normal">ahora ingresa tu dirección para la instalación.</span>
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Delegación</label>
        <Input type="text" placeholder="Colonia" required {...register('nameDelegation')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Colonia</label>
        <Input type="text" placeholder="Colonia" required {...register('nameColonia')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Calle</label>
        <Input type="text" placeholder="Calle" required {...register('street')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Numero exterior</label>
        <Input type="text" placeholder="123" required {...register('numberExt')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Numero interior</label>
        <Input type="text" placeholder="123" required {...register('numberInt')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Referencia</label>
        <Input type="text" placeholder="Referencia" required {...register('reference')} />
      </div>
    </>
  )
}

export default UbicationForm
