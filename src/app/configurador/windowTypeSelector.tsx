import { FC } from 'react';

interface WindowTypeSelectorProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
}

const types = [
  { label: 'Corrediza', value: 'corrediza' },
  { label: 'Abatible', value: 'abatible' }
];

const WindowTypeSelector: FC<WindowTypeSelectorProps> = ({ selectedType, onSelect }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Selecciona el Tipo de Apertura</h2>
    <div className="flex gap-4">
      {types.map((type) => (
        <button
          key={type.value}
          onClick={() => onSelect(type.value)}
          className={`px-4 py-2 rounded border ${selectedType === type.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
        >
          {type.label}
        </button>
      ))}
    </div>
  </div>
);

export default WindowTypeSelector;
