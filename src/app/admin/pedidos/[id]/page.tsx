'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminProtectedRoute from '@/components/AdminProtectedRoute'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { getPedidoById, updatePedidoStatus, deletePedido } from '@/app/api/actions/pedidos'
import { formatPrice, formatDate } from '@/constants'
import {
  ArrowLeft,
  Trash2,
  MessageCircle,
  User,
  FileText,
  CreditCard,
  Calendar,
  MapPin,
  Package,
  AlertTriangle
} from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmationDialog from '@/components/ui/confirmation-dialog'
import Link from 'next/link'

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
  notes?: string | null
}

export default async function PedidoDetalle({ params }: { params: { id: string } }) {
  

  const pedidoData = await getPedidoById(params.id)

  // Asegurarnos de que los datos sean completamente serializables
  // Convertir a JSON y de vuelta para eliminar cualquier prototipo
  const pedido = pedidoData ? JSON.parse(JSON.stringify(pedidoData)) : null

  if (!pedido) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 p-6 rounded-lg shadow text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-700 mb-2">Pedido no encontrado</h1>
          <p className="text-red-600 mb-4">No se pudo encontrar el pedido con ID: {params.id}</p>
          <Link href="/admin/pedidos" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Volver a la lista de pedidos
          </Link>
        </div>
      </div>
    )
  }

  

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalles del Pedido</h1>
        <Link href="/admin/pedidos" className="text-blue-500 hover:text-blue-700">
          ← Volver a la lista
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información del pedido */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4 pb-2 border-b">
            <Package className="h-5 w-5 mr-2 text-blue-500" />
            <h2 className="text-xl font-semibold">Información del Pedido</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">ID del Pedido</p>
              <p className="font-medium">{pedido.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    pedido.status === 'completado'
                      ? 'bg-green-500'
                      : pedido.status === 'pendiente'
                      ? 'bg-yellow-500'
                      : pedido.status === 'cancelado'
                      ? 'bg-red-500'
                      : 'bg-gray-500'
                  }`}
                ></span>
                <p className="font-medium capitalize">{pedido.status || 'No especificado'}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Fecha de Creación</p>
              <p className="font-medium">{formatDate(pedido.created_at)}</p>
            </div>

            {pedido.updated_at && (
              <div>
                <p className="text-sm text-gray-500">Última Actualización</p>
                <p className="font-medium">{formatDate(pedido.updated_at)}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500">Precio</p>
              <p className="font-medium text-lg text-green-700">{formatPrice(pedido.price)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Tipo de Pago</p>
              <p className="font-medium capitalize">{pedido.payment_type || 'No especificado'}</p>
            </div>

            {pedido.notes && (
              <div>
                <p className="text-sm text-gray-500">Notas</p>
                <p className="font-medium">{pedido.notes}</p>
              </div>
            )}

            {/* Datos adicionales del pedido */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500 font-semibold">Datos Adicionales</p>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {Object.entries(pedido)
                  .filter(
                    ([key]) =>
                      ![
                        'id',
                        'status',
                        'created_at',
                        'updated_at',
                        'price',
                        'payment_type',
                        'notes',
                        'Id_user',
                        'usuario'
                      ].includes(key)
                  )
                  .map(([key, value]) => {
                    // Solo mostrar si el valor existe y no es null/undefined
                    if (value === null || value === undefined) return null

                    return (
                      <div key={key} className="overflow-hidden">
                        <p className="text-xs text-gray-500 truncate">{key}</p>
                        <p className="text-sm font-medium truncate">
                          {typeof value === 'string' || typeof value === 'number'
                            ? String(value)
                            : typeof value === 'boolean'
                            ? value
                              ? 'Sí'
                              : 'No'
                            : 'Objeto complejo'}
                        </p>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4 pb-2 border-b">
            <User className="h-5 w-5 mr-2 text-blue-500" />
            <h2 className="text-xl font-semibold">Información del Cliente</h2>
          </div>

          {pedido.usuario ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">
                  {pedido.usuario?.user_metadata?.name || pedido.usuario?.name || 'No disponible'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Correo Electrónico</p>
                <p className="font-medium">{pedido.usuario?.email || 'No disponible'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">
                  {pedido.usuario?.user_metadata?.phone || pedido.usuario?.phone || 'No disponible'}
                </p>
              </div>

              {(pedido.usuario?.street || pedido.usuario?.user_metadata?.street) && (
                <div>
                  <p className="text-sm text-gray-500">Dirección</p>
                  <p className="font-medium">
                    {`${pedido.usuario?.street || pedido.usuario?.user_metadata?.street || ''} 
                      ${pedido.usuario?.numberExt || pedido.usuario?.user_metadata?.numberExt || ''} 
                      ${
                        pedido.usuario?.numberInt || pedido.usuario?.user_metadata?.numberInt
                          ? `Int. ${pedido.usuario?.numberInt || pedido.usuario?.user_metadata?.numberInt}`
                          : ''
                      }`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {`${pedido.usuario?.nameColonia || pedido.usuario?.user_metadata?.nameColonia || ''}, 
                      ${pedido.usuario?.nameDelegation || pedido.usuario?.user_metadata?.nameDelegation || ''}`}
                  </p>
                </div>
              )}

              {(pedido.usuario?.reference || pedido.usuario?.user_metadata?.reference) && (
                <div>
                  <p className="text-sm text-gray-500">Referencias</p>
                  <p className="font-medium">{pedido.usuario?.reference || pedido.usuario?.user_metadata?.reference}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">ID de Usuario</p>
                <p className="font-medium">{pedido.Id_user || 'No disponible'}</p>
              </div>

              {pedido.usuario?.created_at && (
                <div>
                  <p className="text-sm text-gray-500">Fecha de Registro</p>
                  <p className="font-medium">{formatDate(pedido.usuario.created_at)}</p>
                </div>
              )}

              {pedido.usuario?.last_sign_in_at && (
                <div>
                  <p className="text-sm text-gray-500">Último Inicio de Sesión</p>
                  <p className="font-medium">{formatDate(pedido.usuario.last_sign_in_at)}</p>
                </div>
              )}

              {/* Mostrar metadatos del usuario si existen */}
              {pedido.usuario?.user_metadata && Object.keys(pedido.usuario.user_metadata).length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 font-semibold mt-2">Metadatos del Usuario</p>
                  <div className="bg-gray-50 p-2 rounded mt-1 text-xs">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(pedido.usuario.user_metadata, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 rounded-md">
              <p className="text-yellow-700">No se encontró información del usuario para este pedido.</p>
              <p className="text-sm text-yellow-600 mt-1">ID de Usuario: {pedido.Id_user || 'No disponible'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4 pb-2 border-b">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold">Acciones</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            onClick={() => window.print()}
          >
            <span className="mr-2">Imprimir Pedido</span>
          </button>

          <Link
            href={`/admin/pedidos/editar/${pedido.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center"
          >
            <span className="mr-2">Editar Pedido</span>
          </Link>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
            onClick={() => {
              if (confirm('¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer.')) {
                // Lógica para eliminar el pedido
                alert('Funcionalidad de eliminación no implementada aún')
              }
            }}
          >
            <span className="mr-2">Eliminar Pedido</span>
          </button>
        </div>
      </div>
    </div>
  )
}
