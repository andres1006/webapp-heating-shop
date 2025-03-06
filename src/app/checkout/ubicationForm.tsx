import { Input } from '@/components/ui/input'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

interface UbicationFormProps {}

const UbicationForm: FC<UbicationFormProps> = () => {
  const { register } = useFormContext()

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        <span className="text-gray-500 font-normal">Ahora completa tu información para la instalación.</span>
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <Input type="text" placeholder="Juan Perez" required {...register('name')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Teléfono</label>
        <Input type="tel" placeholder="55 5555 5555" required {...register('phone')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Delegación</label>
        <Input type="text" placeholder="Colonia" required disabled {...register('nameDelegation')} />
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
        <Input type="text" placeholder="123" {...register('numberInt')} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Referencia</label>
        <Input type="text" placeholder="Referencia" {...register('reference')} />
      </div>
    </>
  )
}

export default UbicationForm
