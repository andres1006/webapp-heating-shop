import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de Administración - Freddo',
  description: 'Panel de administración para gestionar pedidos'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50 mt-12">{children}</div>
}
