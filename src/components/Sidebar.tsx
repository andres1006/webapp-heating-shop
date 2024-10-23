'use client'
import { MoreVertical, ChevronLast, ChevronFirst, Home, User, Settings } from "lucide-react"
import React, { createContext, useState } from "react"
import { Button } from "./ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

export const SidebarContext = createContext({ expanded: false })


export const SidebarContent = () => (
  <div className="space-y-4 py-4">
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Menú
      </h2>
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Inicio
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Perfil
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
      </div>
    </div>
    <Separator />
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Otros
      </h2>
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Equipo
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Soporte
        </Button>
      </div>
    </div>
  </div>
)

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <aside
      className={`hidden md:block transition-all border-r duration-300 ease-in-out ${isOpen ? "w-64" : "w-16"
        }`}
    >
      <ScrollArea className="h-full">
        {isOpen ? (
          <SidebarContent />
        ) : (
          <div className="py-4 h-full">
            <div className="space-y-4 py-4">
              <Button variant="ghost" size="icon" className="w-full">
                <Home className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-full">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-full">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="space-y-4 py-4 ">
              <Button variant="ghost" size="icon" className="w-full">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-full">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
