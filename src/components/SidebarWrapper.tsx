'use client'
import React from 'react'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

const SidebarWrapper = ({ children }: Props) => {

  return (
    <>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-accent/10">
          {children}
        </main>
      </div>
      {/* Contenido de la página */}
    </>
  )
}

export default SidebarWrapper