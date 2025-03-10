import { ImageResponse } from 'next/og'

// Configuración de la ruta para la imagen de Open Graph
export const runtime = 'edge'
export const alt = 'Freddo - Instalación de Aire Acondicionado en México'
export const size = {
  width: 1200,
  height: 630
}

// Función para generar la imagen de Open Graph
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #3b82f6, #1e40af)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          <img
            src="https://www.freddo.mx/assets/logo.png"
            alt="Freddo Logo"
            width={200}
            height={200}
            style={{ marginRight: '20px' }}
          />
          <div style={{ fontSize: '64px', fontWeight: 'bold' }}>Freddo</div>
        </div>
        <div style={{ fontSize: '36px', textAlign: 'center', marginBottom: '20px' }}>
          Instalación Profesional de Aire Acondicionado
        </div>
        <div style={{ fontSize: '24px', textAlign: 'center', opacity: 0.8 }}>
          Soluciones de climatización para hogares y oficinas en México
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
