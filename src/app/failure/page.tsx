'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { FaRegSadCry } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { updatePedidoByClientId } from '../api/actions/pedidos'
import { toast } from 'react-hot-toast'

const FailurePage = ({
  searchParams
}: {
  searchParams: { preference_id: string; collection_id: string; message: string }
}) => {
  const { preference_id, collection_id, message } = searchParams
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Recuperar el client_id del localStorage
  const client_id = typeof window !== 'undefined' ? localStorage.getItem('mp_client_id') : null

  // Recuperar los datos de las cookies para el resumen
  const nameDelegation = Cookies.get('nameDelegation') || ''
  const windowType = Cookies.get('windowType') || ''
  const windowSize = Cookies.get('windowSize') || ''
  const paymentType = Cookies.get('paymentType') || ''

  
  

  // Actualizar el estado del pedido cuando se carga la página
  useEffect(() => {
    const updateOrderStatus = async () => {
      if (!client_id) {
        
        return
      }

      setIsUpdating(true)
      setUpdateStatus('loading')

      try {
        const result = await updatePedidoByClientId(client_id, 'cancelled')

        if (result) {
          
          setUpdateStatus('success')
          toast.success('El estado del pedido ha sido actualizado')
        } else {
          
          setUpdateStatus('error')
          toast.error('No se pudo actualizar el estado del pedido')
        }
      } catch (error) {
        
        setUpdateStatus('error')
        toast.error('Error al actualizar el estado del pedido')
      } finally {
        setIsUpdating(false)
      }
    }

    if (client_id) {
      updateOrderStatus()
    }
  }, [client_id])

  // Crear los parámetros para la URL de checkout
  const params = new URLSearchParams({
    nameDelegation,
    windowType,
    windowSize,
    paymentType
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <FaRegSadCry className="text-7xl text-blue-400 mb-4" />
      <h1 className="text-2xl font-bold mt-2 mb-2">Pago Fallido</h1>
      <p className="text-lg text-center mb-4">
        Lo sentimos, el pago se canceló o no se realizó correctamente. Por favor, intenta nuevamente.
        {message && <span className="block mt-2">{message}</span>}
      </p>

      {updateStatus === 'loading' && (
        <p className="text-sm text-blue-500 mb-4">Actualizando el estado de tu pedido...</p>
      )}

      {updateStatus === 'success' && (
        <p className="text-sm text-green-500 mb-4">El estado de tu pedido ha sido actualizado correctamente.</p>
      )}

      {updateStatus === 'error' && (
        <p className="text-sm text-red-500 mb-4">
          No se pudo actualizar el estado de tu pedido. Por favor, contacta a soporte.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Link href={`/checkout?${params.toString()}`}>
          <Button className="w-full sm:w-auto">Reintentar pago</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full sm:w-auto">
            Regresar a la página principal
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FailurePage
