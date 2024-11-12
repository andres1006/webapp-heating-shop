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
  console.log(selectedType)
  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl font-semibold mb-4">Selecciona el Tipo de Apertura</h2>
      <p className="text-sm  mb-4">Selecciona el tipo de apertura que deseas para tu ventana.</p>
      <div className="flex gap-4">
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
