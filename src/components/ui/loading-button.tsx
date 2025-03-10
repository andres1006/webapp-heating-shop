import React from 'react'
import { Button } from './button'
import LoadingSpinner from './loading-spinner'

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'default',
  size = 'default',
  className = ''
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" className="mr-2" />
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default LoadingButton
