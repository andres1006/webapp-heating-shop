'use client'
import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

const SidebarWrapper = ({ children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-accent/10 p-6">
          {children}
          {/*           <ScrollArea className="h-full">
        <h2 className="text-2xl font-semibold mb-4">Contenido Principal</h2>
        <p>Aquí va el contenido principal de tu aplicación.</p>
      </ScrollArea> */}
        </main>
      </div>
      {/* Contenido de la página */}
    </>
  )
}

export default SidebarWrapper