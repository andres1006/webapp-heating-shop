import { useState, useEffect } from 'react'

/**
 * Breakpoints comunes para diseño responsive
 */
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
}

/**
 * Hook para detectar si una media query coincide
 * @param query - Media query a evaluar
 * @returns true si la media query coincide, false en caso contrario
 */
export function useMediaQuery(query: string): boolean {
    // Estado para almacenar si la media query coincide
    const [matches, setMatches] = useState<boolean>(false)

    useEffect(() => {
        // Verificar si window está disponible (para SSR)
        if (typeof window === 'undefined') {
            return
        }

        // Crear media query
        const mediaQuery = window.matchMedia(query)

        // Actualizar estado inicial
        setMatches(mediaQuery.matches)

        // Función para manejar cambios en la media query
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches)
        }

        // Añadir listener para cambios
        mediaQuery.addEventListener('change', handleChange)

        // Limpiar listener al desmontar
        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [query])

    return matches
}

/**
 * Hook para detectar si la pantalla es móvil
 * @returns true si la pantalla es móvil, false en caso contrario
 */
export function useIsMobile(): boolean {
    return useMediaQuery(`(max-width: ${breakpoints.md})`)
}

/**
 * Hook para detectar si la pantalla es tablet
 * @returns true si la pantalla es tablet, false en caso contrario
 */
export function useIsTablet(): boolean {
    return useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`)
}

/**
 * Hook para detectar si la pantalla es desktop
 * @returns true si la pantalla es desktop, false en caso contrario
 */
export function useIsDesktop(): boolean {
    return useMediaQuery(`(min-width: ${breakpoints.lg})`)
} 