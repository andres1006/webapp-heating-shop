import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para guardar datos en cookies con opciones de seguridad
export function saveDataInCookie(key: string, value: any, options: Cookies.CookieAttributes = {}) {
  // No guardar datos sensibles en cookies
  const sensitiveFields = ['password', 'token', 'credit_card', 'cvv', 'ssn'];

  // Si es un objeto, verificar y filtrar campos sensibles
  if (typeof value === 'object' && value !== null) {
    const safeData = { ...value };

    sensitiveFields.forEach(field => {
      if (field in safeData) {
        delete safeData[field];
      }
    });

    // Establecer opciones de seguridad por defecto
    const secureOptions = {
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'strict' as const,
      expires: 1, // 1 día por defecto
      ...options
    };

    Cookies.set(key, JSON.stringify(safeData), secureOptions);
    return;
  }

  // Para valores simples
  const secureOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    expires: 1,
    ...options
  };

  Cookies.set(key, String(value), secureOptions);
}

// Función para obtener datos de cookies
export function getCookie(key: string) {
  const data = Cookies.get(key);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

// Función para eliminar cookies
export function removeCookie(key: string) {
  Cookies.remove(key);
}
