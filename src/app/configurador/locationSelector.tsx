
import { FC, useState } from 'react';

interface LocationSelectorProps {
  onValidLocation: () => void;
}

const VALID_ZIP_CODES = ['10001', '10002', '10003']; // Ejemplo de códigos postales válidos

const LocationSelector: FC<LocationSelectorProps> = ({ onValidLocation }) => {
  const [zipCode, setZipCode] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    if (VALID_ZIP_CODES.includes(zipCode)) {
      setIsValid(true);
      onValidLocation();
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Verifica tu Código Postal</h2>
      <input
        type="text"
        placeholder="Ingresa tu código postal"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />
      <button
        onClick={handleValidate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Validar Ubicación
      </button>
      {isValid === false && <p className="text-red-500 mt-2">Ubicación no válida</p>}
      {isValid === true && <p className="text-green-500 mt-2">Ubicación válida</p>}
    </div>
  );
};

export default LocationSelector;
