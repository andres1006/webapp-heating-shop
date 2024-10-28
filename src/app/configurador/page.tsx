'use client'
import { useState } from 'react';
import WindowSizeSelector from './windowsSizeSelector';
import WindowTypeSelector from './windowTypeSelector';
import Summary from './summary';
import LocationSelector from './locationSelector';
import UserForm from './userForm';

export default function ConfiguratorPage() {
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [windowSize, setWindowSize] = useState<string | null>(null);
  const [windowType, setWindowType] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Configura tu Aire Acondicionado</h1>

      {/* Selector de Ubicación */}
      {!isLocationValid && (
        <LocationSelector onValidLocation={() => setIsLocationValid(true)} />
      )}

      {/* Formulario de Usuario */}
      {isLocationValid && !userData && (
        <UserForm onSubmit={(data) => setUserData(data)} />
      )}
      {/* Selección de tamaño de ventana */}
      {userData && (
        <>
          <WindowSizeSelector selectedSize={windowSize} onSelect={setWindowSize} />

          {/* Selección de tipo de apertura */}
          <WindowTypeSelector selectedType={windowType} onSelect={setWindowType} />

          {/* Resumen de configuración */}
          <Summary windowSize={windowSize} windowType={windowType} />
        </>
      )}

    </div>
  );
}
