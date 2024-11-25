import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SidebarWrapper from '@/components/SidebarWrapper'

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
      </body>
    </html>
  )
}
