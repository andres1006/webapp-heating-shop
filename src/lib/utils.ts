import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const saveDataInCookie = (key: string, value: string) => {
  Cookies.set(key, value, { expires: 7 }) // La cookie expirará en 7 días
}

export const getCookie = (key: string) => {
  return Cookies.get(key) || ''
}
