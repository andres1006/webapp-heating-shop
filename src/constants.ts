export const phone = '+1 (832) 282‑5365'
export const whatsapp = '+18322825365'
export const email = 'soporte@freedo.com'
export const emailSoporteFreddo = 'soporte@freedo.com'
export const KEY_ONE_SIGNAL =
  'os_v2_app_axpefif2ojdhvpyvanwtn3j3prrrt5rr57zevq575pngwnxqb63ewr7zftpmajytzyzabpn7snoizr5vcrs3d3lkf5iw6xh4oov6uda'
export const URL_ONE_SIGNAL = 'https://onesignal.com/api/v1/notifications'
export const APLICATION_ID_ONE_SIGNAL = '05de42a0-ba72-467a-bf15-036d36ed3b7c'

export const PRICE_INSTALLATION_CONTADO = process.env.NEXT_PUBLIC_PRICE_INSTALLATION_CONTADO || 11999
export const PRICE_INSTALLATION_FINANCIADO = process.env.NEXT_PUBLIC_PRICE_INSTALLATION_FINANCIADO || 12999

// Precios de los productos
export const PRICES = {
  CONTADO: 11999,
  FINANCIADO: 12999,
  MENSUALIDAD_FINANCIADA: 1083 // 12999 / 12 meses
}

// Formato para mostrar precios en MXN
export const formatPrice = (price: number): string => {
  // Verificar que el precio sea un número válido
  if (typeof price !== 'number' || isNaN(price) || !isFinite(price)) {
    console.warn(`Intentando formatear un precio inválido: ${price}`);
    return '$0 MXN';
  }

  // Asegurarse de que el precio sea positivo
  const safePrice = Math.max(0, price);

  // Formatear el precio con separadores de miles y sin decimales
  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(safePrice);
  } catch (error) {
    
    return `$${safePrice.toLocaleString()} MXN`;
  }
}

/**
 * Formatea una fecha en formato legible
 * @param dateString Cadena de fecha a formatear
 * @returns Fecha formateada en formato local
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'No disponible';

  try {
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    
    return 'Error en formato';
  }
}

// Opciones de pago y precios
export const PAYMENT_OPTIONS = [
  {
    id: 'contado',
    label: '1 pago',
    price: 12000,
    months: 1,
    monthlyPayment: null
  },
  {
    id: 'meses_6',
    label: '6 meses',
    price: 12960,
    months: 6,
    monthlyPayment: 2160
  },
  {
    id: 'meses_12',
    label: '12 meses',
    price: 13560,
    months: 12,
    monthlyPayment: 1130
  },
  {
    id: 'meses_24',
    label: '24 meses',
    price: 15360,
    months: 24,
    monthlyPayment: 640
  }
];

// Función para obtener el precio según el plazo seleccionado
export function getPriceByPaymentOption(paymentOptionId: string): number {
  const option = PAYMENT_OPTIONS.find(option => option.id === paymentOptionId);
  return option ? option.price : PAYMENT_OPTIONS[0].price; // Precio por defecto si no se encuentra la opción
}

// Función para obtener la cuota mensual según el plazo seleccionado
export function getMonthlyPaymentByOption(paymentOptionId: string): number | null {
  const option = PAYMENT_OPTIONS.find(option => option.id === paymentOptionId);
  return option ? option.monthlyPayment : null;
}

// Función para obtener el número de cuotas según la opción de pago
export function getInstallmentsByPaymentOption(paymentOptionId: string): number {
  const option = PAYMENT_OPTIONS.find(option => option.id === paymentOptionId);
  return option && option.months > 1 ? option.months : 1;
}

// Función para obtener todas las opciones de pago
export function getPaymentOptions() {
  return PAYMENT_OPTIONS;
}
