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
  <div className="flex flex-col mb-8 w-full ">
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Selecciona el Tamaño de la Ventana</h2>
      <p className="text-sm mb-4">
        Selecciona el tamaño aproximado de la ventana cerca de donde instalremos el equipo. No tiene que ser medidas
        exactas.
      </p>
    </div>
    <Tabs defaultValue={selectedSize || ''} className="flex flex-1 ">
      <TabsList className="flex flex-wrap h-auto gap-2">
        {sizes.map((size) => (
          <TabsTrigger
            value={size.value}
            onClick={() => onSelect(size.value)}
            className="flex flex-1 flex-col items-center p-2"
          >
            {size.label}
            <p className="text-xs text-gray-500">{size.description}</p>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  </div>
)

export default WindowSizeSelector
