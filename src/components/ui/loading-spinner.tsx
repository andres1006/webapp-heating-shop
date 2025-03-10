import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'primary', className = '' }) => {
  // Determinar el tamaño del spinner
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  // Determinar el color del spinner
  const colorClasses = {
    primary: 'text-blue-500',
    white: 'text-white',
    gray: 'text-gray-400'
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClasses[color]} ${sizeClasses[size]}`}
      ></div>
    </div>
  )
}

export default LoadingSpinner
