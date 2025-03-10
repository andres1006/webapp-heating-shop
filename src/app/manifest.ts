import { MetadataRoute } from 'next'

// Definición del manifiesto para PWA
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Freddo - Instalación de Aire Acondicionado',
        short_name: 'Freddo',
        description: 'Servicio profesional de instalación de aire acondicionado en México',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3b82f6',
        icons: [
            {
                src: '/assets/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/assets/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        orientation: 'portrait',
        prefer_related_applications: false,
        related_applications: [],
        categories: ['home improvement', 'services', 'shopping'],
        screenshots: [
            {
                src: '/assets/BANNERFREDDO-04.png',
                sizes: '1280x720',
                type: 'image/png',
            },
        ],
        shortcuts: [
            {
                name: 'Configurar',
                short_name: 'Configurar',
                description: 'Configura tu instalación de aire acondicionado',
                url: '/configurador',
                icons: [{ src: '/assets/icon.png', sizes: '192x192' }],
            },
            {
                name: 'Contacto',
                short_name: 'Contacto',
                description: 'Contacta con nuestro equipo',
                url: '/contact',
                icons: [{ src: '/assets/icon.png', sizes: '192x192' }],
            },
        ],
    }
} 