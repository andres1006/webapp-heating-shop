'use client'
import ImageHoverButton from '@/components/molecules/ImageHoverButton'
import { FC, useState } from 'react'

interface WindowTypeSelectorProps {
  selectedType: string | null
  onSelect: (type: string) => void
}

const types = [
  {
    label: 'Batiente',
    value: 'batiente',
    image: '/assets/window-types/1.png',
    imageHover: '/assets/window-types/2.png'
  },
  {
    label: 'Abatible',
    value: 'abatible',
    image: '/assets/window-types/4.png',
    imageHover: '/assets/window-types/6.png'
  },
  {
    label: 'Corrediza',
    value: 'corrediza',
    image: '/assets/window-types/7.png',
    imageHover: '/assets/window-types/8.png',
    backgroundImage: '/assets/img-1.png'
  }
]

const WindowTypeSelector: FC<WindowTypeSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="mb-8 w-full ">
      <h2 className="text-xl font-semibold mb-4 text-center">Selecciona el tipo de ventana</h2>
      <p className="text-sm  mb-4 text-center ">
        Instalaremos el equipo cerca de una ventana ya que este expulsa aire caliente que tiene ser expulsado a través
        de una ventana.
      </p>
      <div className="flex gap-2 overflow-auto p-2 justify-center" style={{ scrollbarWidth: 'none' }}>
        {types.map((type) => (
          <ImageHoverButton
            image={type.image}
            imageHover={type.imageHover || ''}
            label={type.label}
            onClick={() => onSelect(type.value)}
            active={selectedType === type.value}
            backgroundImage={type.backgroundImage}
          />
        ))}
      </div>
    </div>
  )
}

export default WindowTypeSelector
