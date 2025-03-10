import { es } from './es'

// Simplificar el tipo para evitar profundidad excesiva
type TranslationKey = string

/**
 * Hook para obtener traducciones
 * @returns Objeto con funciones para obtener traducciones
 */
export function useTranslation() {
    // Por ahora solo soportamos español
    const translations = es

    /**
     * Obtiene una traducción por su clave
     * @param key - Clave de la traducción (puede ser anidada con puntos)
     * @param params - Parámetros para interpolar en la traducción
     * @returns Traducción
     */
    function t(key: TranslationKey, params?: Record<string, string>): string {
        // Dividir la clave por puntos
        const keys = key.split('.')

        // Obtener el valor de la traducción
        let value: any = translations
        for (const k of keys) {
            if (!value[k]) {
                console.warn(`Traducción no encontrada para la clave: ${key}`)
                return key
            }
            value = value[k]
        }

        // Si no es un string, devolver la clave
        if (typeof value !== 'string') {
            console.warn(`La traducción para la clave ${key} no es un string`)
            return key
        }

        // Interpolar parámetros si existen
        if (params) {
            return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
                return acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue)
            }, value)
        }

        return value
    }

    return { t }
} 