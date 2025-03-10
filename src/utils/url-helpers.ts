/**
 * Utilidades para manejar URLs de manera segura
 */

/**
 * Crea una URL con parámetros de consulta de manera segura
 * @param baseUrl - URL base
 * @param params - Objeto con los parámetros de consulta
 * @returns URL completa con parámetros
 */
export function createUrlWithParams(baseUrl: string, params: Record<string, string | null | undefined>): string {
    // Filtrar parámetros nulos o indefinidos
    const filteredParams = Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined)
        .reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
        }, {} as Record<string, string>);

    // Crear objeto URLSearchParams
    const searchParams = new URLSearchParams();

    // Añadir parámetros de manera segura
    Object.entries(filteredParams).forEach(([key, value]) => {
        searchParams.append(key, value);
    });

    // Construir URL final
    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Obtiene los parámetros de consulta de una URL
 * @param url - URL de la que obtener los parámetros
 * @returns Objeto con los parámetros de consulta
 */
export function getParamsFromUrl(url: string): Record<string, string> {
    try {
        const urlObj = new URL(url);
        const params: Record<string, string> = {};

        urlObj.searchParams.forEach((value, key) => {
            params[key] = value;
        });

        return params;
    } catch (error) {
        
        return {};
    }
}

/**
 * Valida si una URL es válida
 * @param url - URL a validar
 * @returns true si la URL es válida, false en caso contrario
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
} 