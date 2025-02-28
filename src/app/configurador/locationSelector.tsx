import Select from '@/components/organisms/select'
import { FC } from 'react'

interface LocationSelectorProps {
  onValidLocation: (colonia: string) => void
  value: string
  setColoniaIsValid: (isValid: boolean) => void
}

const DELEGACIONES = [
  { label: 'Cuauhtémoc', value: 'Cuauhtémoc', isAvailable: true },
  { label: 'Benito Juárez', value: 'Benito Juárez', isAvailable: true },
  { label: 'Miguel Hidalgo', value: 'Miguel Hidalgo', isAvailable: false },
  { label: 'Gustavo A. Madero', value: 'Gustavo A. Madero', isAvailable: false },
  { label: 'Iztapalapa', value: 'Iztapalapa', isAvailable: false },
  { label: 'Álvaro Obregón', value: 'Álvaro Obregón', isAvailable: false },
  { label: 'Azcapotzalco', value: 'Azcapotzalco', isAvailable: false },
  { label: 'Coyoacán', value: 'Coyoacán', isAvailable: false },
  { label: 'Cuajimalpa de Morelos', value: 'Cuajimalpa de Morelos', isAvailable: false },
  { label: 'Iztacalco', value: 'Iztacalco', isAvailable: false },
  { label: 'La Magdalena Contreras', value: 'La Magdalena Contreras', isAvailable: false },
  { label: 'Milpa Alta', value: 'Milpa Alta', isAvailable: false },
  { label: 'Tláhuac', value: 'Tláhuac', isAvailable: false },
  { label: 'Tlalpan', value: 'Tlalpan', isAvailable: false },
  { label: 'Venustiano Carranza', value: 'Venustiano Carranza', isAvailable: false },
  { label: 'Xochimilco', value: 'Xochimilco', isAvailable: false }
] // Ejemplo de nombres de colonias

const LocationSelector: FC<LocationSelectorProps> = ({ onValidLocation, value, setColoniaIsValid }) => {
  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Selecciona tu delegación</h2>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Selecciona el nombre de tu delegación para revisar la disponibilidad en el servicio
      </p>
      <Select
        value={value}
        onChange={(e) => {
          onValidLocation(e)
          const delegacion = DELEGACIONES.find((delegacion) => delegacion.value === e)
          setColoniaIsValid(delegacion?.isAvailable || false)
        }}
        options={DELEGACIONES.map((delegacion) => ({ value: delegacion.value, label: delegacion.label }))}
        placeholder="Selecciona tu delegación"
        className="bg-white rounded-2xl border-none px-6 py-4 w-full "
      />
    </div>
  )
}

export default LocationSelector
