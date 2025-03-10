'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Eye, MessageCircle, Trash2 } from 'lucide-react'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { formatPrice } from '@/constants'
import toast from 'react-hot-toast'
import ConfirmationDialog from '@/components/ui/confirmation-dialog'
import { getPedidos, deletePedido } from '@/app/api/actions/pedidos'
import { deleteCookie } from '@/utils/cookies'

// Tipo para el usuario
interface Usuario {
  id: string
  email?: string | null
  phone?: string | null
  name?: string | null
  street?: string | null
  numberExt?: string | null
  numberInt?: string | null
  reference?: string | null
  nameColonia?: string | null
  nameDelegation?: string | null
  created_at?: string | null
  updated_at?: string | null
  last_sign_in_at?: string | null
  user_metadata?: {
    name?: string | null
    phone?: string | null
    [key: string]: any
  } | null
}

// Tipo para el pedido
interface Pedido {
  id: string
  windowType?: string
  windowSize?: string
  paymentType?: string
  payment_type?: string
  price: number
  status: string
  link_payment?: string
  created_at: string | null
  Id_user?: string
  client_id?: string
  payment_status?: string
  payment_status_detail?: string
  payment_date?: string | null
  last_updated?: string | null
  phone?: string | null
  usuario?: Usuario | null
}

export default function PedidosClient() {
  const router = useRouter()
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pedidoToDelete, setPedidoToDelete] = useState<string | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [totalVentas, setTotalVentas] = useState(0)

  // Cargar pedidos al montar el componente
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setIsLoading(true)
        const pedidosData = await getPedidos()

        // Asegurarnos de que los datos sean completamente serializables
        // Convertir a JSON y de vuelta para eliminar cualquier prototipo
        const pedidosSerializados = JSON.parse(JSON.stringify(pedidosData))

        setPedidos(pedidosSerializados)

        // Calcular total de ventas
        const total = pedidosSerializados.reduce((sum: number, pedido: Pedido) => {
          const precio = typeof pedido.price === 'number' ? pedido.price : 0
          return sum + precio
        }, 0)

        setTotalVentas(total)
      } catch (err: any) {
        
        setError(err.message || 'Error al cargar los pedidos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPedidos()
  }, [])

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar la cookie de administrador
    deleteCookie('adminEmail')
    // Redirigir a la página de inicio de sesión
    router.push('/admin')
  }

  // Función para abrir WhatsApp
  const handleWhatsAppClick = (pedido: Pedido) => {
    // Intentar obtener el teléfono del cliente
    const phone =
      pedido.usuario?.user_metadata?.phone ||
      pedido.usuario?.phone ||
      pedido.phone ||
      pedido.client_id ||
      '5215512345678' // Número por defecto

    // Obtener el nombre del usuario
    const userName = pedido.usuario?.user_metadata?.name || pedido.usuario?.name || ''

    // Crear mensaje predeterminado
    const message = `Hola${
      userName ? ' ' + userName : ''
    }, nos comunicamos de Freddo respecto a tu pedido #${pedido.id.substring(0, 8)}. ¿En qué podemos ayudarte?`

    // Formatear el número de teléfono (eliminar caracteres no numéricos)
    const formattedPhone = phone ? phone.replace(/\D/g, '') : '5215512345678'

    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

    // Abrir en una nueva pestaña
    window.open(whatsappUrl, '_blank')
  }

  // Función para confirmar eliminación
  const confirmDelete = (id: string) => {
    setPedidoToDelete(id)
    setShowDeleteConfirmation(true)
  }

  // Función para eliminar el pedido
  const handleDeletePedido = async () => {
    if (!pedidoToDelete) return

    try {
      setIsDeleting(true)
      const result = await deletePedido(pedidoToDelete)

      if (result.error) {
        toast.error(result.error.message || 'Error al eliminar el pedido')
        return
      }

      if (result.success) {
        toast.success('Pedido eliminado correctamente')
        // Actualizar la lista de pedidos
        setPedidos(pedidos.filter((pedido) => pedido.id !== pedidoToDelete))
      }
    } catch (err: any) {
      toast.error(err.message || 'Error al eliminar el pedido')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirmation(false)
      setPedidoToDelete(null)
    }
  }

  // Formatear fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Obtener color según el estado
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
      case 'completado':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
      case 'cancelado':
        return 'bg-red-100 text-red-800'
      case 'approved':
      case 'aprobado':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Formatear números grandes
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)} millones`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)} mil`
    }
    return num.toString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Administración - Pedidos</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push('/admin/configuracion')}>
            Configuración
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Resumen de ventas */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Resumen de Ventas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total de Ventas</p>
            <p className="text-2xl font-bold text-blue-800">{formatPrice(totalVentas)}</p>
            <p className="text-sm text-blue-600 mt-1">{formatLargeNumber(totalVentas)} pesos</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Número de Pedidos</p>
            <p className="text-2xl font-bold text-green-800">{pedidos.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Promedio por Pedido</p>
            <p className="text-2xl font-bold text-purple-800">
              {pedidos.length > 0 ? formatPrice(totalVentas / pedidos.length) : formatPrice(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Botón para recalcular */}
      <div className="mb-4">
        <Button
          onClick={() => {
            // Recalcular total de ventas basado en tipo de pago
            const total = pedidos.reduce((sum, pedido) => {
              // Usar precio fijo según tipo de pago
              const precio = pedido.payment_type === 'financiado' ? 12999 : 11999
              return sum + precio
            }, 0)

            setTotalVentas(total)
            alert(`Total recalculado: ${formatPrice(total)} (${pedidos.length} pedidos)`)
          }}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Recalcular Total de Ventas
        </Button>
      </div>

      {error && <div className="bg-red-100 p-4 rounded-md text-red-700 mb-4">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{pedido.id.substring(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {pedido.usuario ? (
                            <>
                              {pedido.usuario.user_metadata?.name ||
                                pedido.usuario.name ||
                                pedido.usuario.email ||
                                'Sin nombre'}
                            </>
                          ) : (
                            <span className="text-gray-400">Usuario no encontrado</span>
                          )}
                        </span>
                        {pedido.usuario && (
                          <span className="text-xs text-gray-500">
                            {pedido.usuario.email || pedido.usuario.user_metadata?.email || ''}
                            {pedido.usuario.phone || pedido.usuario.user_metadata?.phone
                              ? ` • ${pedido.usuario.phone || pedido.usuario.user_metadata?.phone}`
                              : ''}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">ID: {pedido.Id_user || 'No disponible'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          pedido.status
                        )}`}
                      >
                        {pedido.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(pedido.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(pedido.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/pedidos/${pedido.id}`}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                        >
                          Ver detalles
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center text-green-600 hover:text-green-800"
                          onClick={() => handleWhatsAppClick(pedido)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center text-red-600 hover:text-red-800"
                          onClick={() => confirmDelete(pedido.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Diálogo de confirmación para eliminar */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeletePedido}
        title="Eliminar Pedido"
        message="¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmVariant="destructive"
      />
    </div>
  )
}
