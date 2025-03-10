// Utilidades para manejar cookies en el navegador

/**
 * Establece una cookie con el nombre, valor y días de expiración especificados
 */
export function setCookie(name: string, value: string, days: number = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

/**
 * Obtiene el valor de una cookie por su nombre
 */
export function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

/**
 * Elimina una cookie por su nombre
 */
export function deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

/**
 * Verifica si una cookie existe
 */
export function hasCookie(name: string): boolean {
    return getCookie(name) !== null;
} 