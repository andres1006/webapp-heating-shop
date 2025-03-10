import PedidosClient from './PedidosClient'
import AdminProtectedRoute from '@/components/AdminProtectedRoute'

export default function PedidosPage() {
  return (
    <AdminProtectedRoute>
      <PedidosClient />
    </AdminProtectedRoute>
  )
}
