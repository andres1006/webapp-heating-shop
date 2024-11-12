'use client'
import React from 'react'
import Header from './Header'
import Footer from './footer'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

type Props = {
  children: React.ReactNode
}

const SidebarWrapper = ({ children }: Props) => {
  return (
    <>
      {/* Header Fijo */}
      <Header />

      {/* Contenido Desplazable */}
      <main className=" pb-20 overflow-y-auto bg-accent/10 min-h-screen">{children}</main>

      {/* Footer Fijo */}
      <Footer />

      {/* Botón de WhatsApp Fijo */}
      <Link
        href="https://wa.me/tu_numero_de_whatsapp" // Reemplaza con tu número de WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center transition"
      >
        <FaWhatsapp fontSize={30} />
      </Link>
    </>
  )
}

export default SidebarWrapper
