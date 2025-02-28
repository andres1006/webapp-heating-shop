import { useEffect, RefObject } from 'react'

type ScrollOptions = {
    behavior?: ScrollBehavior
    block?: ScrollLogicalPosition
    delay?: number
}

/**
 * Hook personalizado para manejar el desplazamiento automático a secciones
 * @param dependencies - Array de dependencias que activarán el desplazamiento
 * @param scrollMap - Mapa de condiciones y referencias a las que desplazarse
 * @param options - Opciones de desplazamiento
 */
export function useScrollToSection(
    dependencies: any[],
    scrollMap: Array<{
        condition: boolean
        ref: RefObject<HTMLElement>
    }>,
    options: ScrollOptions = { behavior: 'smooth', block: 'center', delay: 100 }
): void {
    useEffect(() => {
        const scrollToSection = () => {
            // Encuentra la primera condición que se cumple
            const targetSection = scrollMap.find(({ condition }) => condition)

            if (targetSection?.ref.current) {
                targetSection.ref.current.scrollIntoView({
                    behavior: options.behavior,
                    block: options.block
                })
            }
        }

        // Pequeño retraso para asegurar que los componentes estén renderizados
        const timer = setTimeout(() => {
            scrollToSection()
        }, options.delay || 100)

        return () => clearTimeout(timer)
    }, dependencies)
}

/**
 * Hook personalizado para manejar el desplazamiento secuencial a múltiples secciones
 * @param dependencies - Array de dependencias que activarán el desplazamiento
 * @param scrollSequence - Secuencia de referencias a las que desplazarse con sus respectivos retrasos
 * @param options - Opciones de desplazamiento
 */
export function useSequentialScrollToSection(
    dependencies: any[],
    scrollSequence: Array<{
        condition: boolean
        ref: RefObject<HTMLElement>
        sequentialDelay?: number
    }>,
    options: ScrollOptions = { behavior: 'smooth', block: 'center', delay: 100 }
): void {
    useEffect(() => {
        const scrollToSections = () => {
            // Filtra las secciones cuyas condiciones se cumplen
            const targetSections = scrollSequence.filter(({ condition }) => condition)

            // Desplázate a cada sección en secuencia
            targetSections.forEach(({ ref, sequentialDelay = 300 }, index) => {
                setTimeout(() => {
                    if (ref.current) {
                        ref.current.scrollIntoView({
                            behavior: options.behavior,
                            block: options.block
                        })
                    }
                }, (options.delay || 100) + index * sequentialDelay)
            })
        }

        // Pequeño retraso inicial para asegurar que los componentes estén renderizados
        const timer = setTimeout(() => {
            scrollToSections()
        }, options.delay || 100)

        return () => clearTimeout(timer)
    }, dependencies)
} 