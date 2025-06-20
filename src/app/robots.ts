import { MetadataRoute } from 'next'

// Definición de robots.txt para controlar el rastreo e indexación
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/api/',
                '/private/',
                '/*.json$',
            ],
        },
        sitemap: 'https://www.freddoair.com/sitemap.xml',
        host: 'https://www.freddoair.com',
    }
} 