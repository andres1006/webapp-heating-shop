'use client'

import { useEffect, useState, RefObject } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { MdSummarize } from 'react-icons/md'

type FloatingLinkProps = {
  targetRef: RefObject<HTMLElement>
  label: string
  icon?: React.ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

/**
 * Componente de enlace flotante que aparece cuando el usuario se desplaza más allá del elemento de referencia
 */
export default function FloatingLink({
  targetRef,
  label,
  icon = <MdSummarize className="mr-2" />,
  position = 'bottom-right'
}: FloatingLinkProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkScrollPosition = () => {
      if (!targetRef.current) return

      const rect = targetRef.current.getBoundingClientRect()

      // El enlace flotante aparece cuando el elemento de referencia está fuera de la vista
      const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight
      setIsVisible(isOutOfView)
    }

    // Verificar la posición inicial
    checkScrollPosition()

    // Agregar listener para el evento de desplazamiento
    window.addEventListener('scroll', checkScrollPosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [targetRef])

  const handleClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Determinar las clases de posición
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={handleClick}
            className="shadow-lg bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 flex items-center"
          >
            {icon}
            {label}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
