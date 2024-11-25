import { FC } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface WindowSizeSelectorProps {
  selectedSize: string | null
  onSelect: (size: string) => void
}

const sizes = [
  { label: 'Pequeña', value: 'pequeña', description: 'Menor a 1mt de alto' },
  { label: 'Mediana', value: 'mediana', description: 'Hasta 2mts de alto' },
  { label: 'Grande', value: 'grande', description: 'Mayor a 2mts de alto' }
]

const WindowSizeSelector: FC<WindowSizeSelectorProps> = ({ selectedSize, onSelect }) => (
  <div className="mb-8 w-full">
    <h2 className="text-xl font-semibold mb-4">Selecciona el Tamaño de la Ventana</h2>
    <p className="text-sm mb-4">
      Selecciona el tamaño aproximado de la ventana cerca de donde instalremos el equipo. No tiene que ser medidas
      exactas.
    </p>
    <div className="flex gap-4">
      <Tabs defaultValue={selectedSize || ''} className="w-[400px]">
        <TabsList>
          {sizes.map((size) => (
            <TabsTrigger value={size.value} onClick={() => onSelect(size.value)}>
              {size.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  </div>
)

export default WindowSizeSelector
