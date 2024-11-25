import Select from '@/components/organisms/select'
import { FC } from 'react'

interface LocationSelectorProps {
  onValidLocation: (colonia: string) => void
  value: string
}

const COLONIAS = ['Cuauhtémoc', 'Benito Juarez)'] // Ejemplo de nombres de colonias

const LocationSelector: FC<LocationSelectorProps> = ({ onValidLocation, value }) => {
  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Selecciona tu delegación</h2>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Ingresa el nombre de tu colonia para para revisar la disponibilidad en el servicio
      </p>
      <Select
        value={value}
        onChange={(e) => onValidLocation(e)}
        options={COLONIAS.map((colonia) => ({ value: colonia, label: colonia }))}
        placeholder="Selecciona tu delegación"
        className="bg-white rounded-2xl border-none px-6 py-4 w-full "
      />
    </div>
  )
}

export default LocationSelector
