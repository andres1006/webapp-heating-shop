'use client'

import { MenuIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'

const navLinks = [
  { href: '/', label: 'Inicio' },
  //{ href: '/service', label: 'Servicios' },
  // { href: '/financiamiento', label: 'Financiamiento' },
  { href: '/faq', label: 'Preguntas frecuentes' },
  { href: '/contact', label: 'Contacto' }
  /*  { href: '/admin', label: 'Admin', isAdmin: true } */
]

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between border-none items-center h-16 px-4 md:px-6 transition-colors duration-100 bg-blue-300 shadow-lg border-b-2`}
      >
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <img
              src="/assets/logo-horizontal.png"
              alt="Logo"
              width={70}
              height={40}
              className="
             md:block"
            />
          </Link>

          <div className="hidden md:flex md:space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                <p
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium text-gray-100 hover:text-gray-200`}
                >
                  {label}
                </p>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/*             <Link href="/checkout">
              <p
                className={`flex items-center ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-blue-200 hover:text-gray-300'
                }`}
              >
                <ShoppingCartIcon className="h-6 w-6" />
              </p>
            </Link> */}
            <Link href="/configurador">
              <p className="px-4 py-2 rounded-md bg-blue-400 text-white hover:bg-blue-500">Contrata ahora</p>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={openSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Abrir menú"
            >
              <MenuIcon className="h-6 w-6 text-gray-100 hover:text-gray-700 focus:outline-none" />
            </button>
          </div>
        </div>

        {isSidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeSidebar}></div>

            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300">
              <div className="flex items-center justify-between p-4 border-b">
                <img src="/assets/logo-horizontal.png" alt="Logo" width={100} height={100} />
                <button
                  onClick={closeSidebar}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  aria-label="Cerrar menú"
                >
                  <MdClose />
                </button>
              </div>
              <nav className="mt-4">
                {navLinks.map(({ href, label }) => (
                  <Link key={href} href={href}>
                    <p onClick={closeSidebar} className="block px-4 py-2 text-lg font-medium text-gray-700">
                      {label}
                    </p>
                  </Link>
                ))}
                <div className="border-t my-2"></div>
                {/*              <Link href="/checkout">
                  <p onClick={closeSidebar} className="flex items-center px-4 py-2 text-lg font-medium text-gray-700">
                    <ShoppingCartIcon className="h-6 w-6 mr-2" />
                  </p>
                </Link> */}
                <Link href="/configurador">
                  <p
                    onClick={closeSidebar}
                    className="block mx-4 px-4 py-2 text-lg font-medium rounded-md text-center bg-blue-400 text-white hover:bg-blue-500"
                  >
                    Contrata ahora
                  </p>
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  )
}

export default Header
