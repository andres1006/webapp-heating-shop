import { useEffect, RefObject } from 'react'

interface ScrollOptions {
    behavior?: ScrollBehavior
    block?: ScrollLogicalPosition
    inline?: ScrollLogicalPosition
    delay?: number
}

/**
 * Hook para desplazarse a una sección específica cuando cambia una dependencia
 * @param ref - Referencia al elemento al que desplazarse
 * @param dependencies - Array de dependencias que activarán el desplazamiento
 * @param options - Opciones de desplazamiento
 */
export function useScrollToSection(
    ref: RefObject<HTMLElement>,
    dependencies: any[] = [],
    options: ScrollOptions = {}
): void {
    useEffect(() => {
        if (!ref.current) return

        const {
            behavior = 'smooth',
            block = 'start',
            inline = 'nearest',
            delay = 100
        } = options

        // Pequeño retraso para asegurar que los componentes estén renderizados
        const timer = setTimeout(() => {
            ref.current?.scrollIntoView({
                behavior,
                block,
                inline
            })
        }, delay)

        return () => clearTimeout(timer)
    }, dependencies)
}

/**
 * Hook para desplazarse secuencialmente a través de secciones basado en un paso actual
 * @param refs - Objeto con referencias a elementos por paso
 * @param currentStep - Paso actual
 * @param options - Opciones de desplazamiento
 */
export function useSequentialScrollToSection(
    refs: Record<number, RefObject<HTMLElement>>,
    currentStep: number,
    options: ScrollOptions = {}
): void {
    useEffect(() => {
        if (!refs[currentStep]?.current) return

        const {
            behavior = 'smooth',
            block = 'start',
            inline = 'nearest',
            delay = 100
        } = options

        // Pequeño retraso para asegurar que los componentes estén renderizados
        const timer = setTimeout(() => {
            refs[currentStep].current?.scrollIntoView({
                behavior,
                block,
                inline
            })
        }, delay)

        return () => clearTimeout(timer)
    }, [currentStep, refs])
} 