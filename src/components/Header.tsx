'use client'

import { ShoppingCartIcon } from "lucide-react"
import React, { } from "react"

const Header = () => {



  return <header className="flex h-14 items-center border-b px-4 lg:px-6" >
    <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold"> <a href="/" className="text-gray-800">Heating Shop</a></h1>


      <div className="flex gap-2">
        <a href="/products" className="text-gray-600 hover:text-gray-900">Productos</a>
        <a href="/contact" className="text-gray-600 hover:text-gray-900">Contacto</a>
        {/* Icono del Carrito */}
        <a href="/configurador" className="relative text-gray-600 hover:text-gray-900">
          <ShoppingCartIcon size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </a>
        <a href="/configurador" className="relative text-gray-600 hover:text-gray-900">
          <ShoppingCartIcon size={24} />
        </a>
      </div>
    </div>
  </ header>
}
export default Header