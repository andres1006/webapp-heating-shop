import { FC } from 'react';

interface WindowSizeSelectorProps {
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

const sizes = [
  { label: 'Pequeña', value: 'pequeña' },
  { label: 'Mediana', value: 'mediana' },
  { label: 'Grande', value: 'grande' }
];

const WindowSizeSelector: FC<WindowSizeSelectorProps> = ({ selectedSize, onSelect }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Selecciona el Tamaño de la Ventana</h2>
    <div className="flex gap-4">
      {sizes.map((size) => (
        <button
          key={size.value}
          onClick={() => onSelect(size.value)}
          className={`px-4 py-2 rounded border ${selectedSize === size.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          {size.label}
        </button>
      ))}
    </div>
  </div>
);

export default WindowSizeSelector;