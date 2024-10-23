'use client'
import { User, Settings } from "lucide-react"
import React, { createContext, useState } from "react"
import { Button } from "./ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { SidebarContent } from "./Sidebar"

import { Bell, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type Props = {
  isOpen: boolean,
  toggleSidebar: () => void
}


const Header = ({ isOpen, toggleSidebar }: Props) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nueva actualización disponible' },
    { id: 2, message: 'Tienes un nuevo mensaje' },
    { id: 3, message: 'Recordatorio: Reunión en 30 minutos' },
  ])

  const clearNotifications = () => setNotifications([])


  return <header className="flex h-14 items-center border-b px-4 lg:px-6" >
    <Button
      variant="ghost"
      size="icon"
      className="mr-2 md:hidden"
      aria-label="Abrir menú"
    >
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <ScrollArea className="h-full">
            <SidebarContent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="mr-2 hidden md:flex"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </Button>
    <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Mi Aplicación</h1>
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">Notificaciones</h2>
              <Button variant="ghost" size="sm" onClick={clearNotifications}>
                Limpiar todas
              </Button>
            </div>
            {notifications.length > 0 ? (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li key={notification.id} className="text-sm">
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No hay notificaciones nuevas</p>
            )}
          </PopoverContent>
        </Popover>

        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuario" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Usuario</p>
                <p className="text-xs leading-none text-muted-foreground">
                  usuario@ejemplo.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </ header>
}
export default Header