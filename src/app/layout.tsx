import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SidebarWrapper from '@/components/SidebarWrapper'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Freddo',
  description: 'Freddo'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarWrapper>{children}</SidebarWrapper>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#000'
            },
            success: {
              duration: 3000,
              style: {
                background: '#22c55e',
                color: '#fff'
              }
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
                color: '#fff'
              }
            }
          }}
        />
      </body>
    </html>
  )
}
