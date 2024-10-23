'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from '@/auth'
import { useFormState } from 'react-dom'
import { authenticate } from "./action";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  console.log('login', errorMessage)
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://www.cactusdigital.com/wp-content/uploads/2016/09/bg.jpg?height=1080&width=1920')" }}>
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      <form className="space-y-6" action={dispatch}>
        <Card className="w-[350px] z-10">
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>Inicia sesión en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  name='email'
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  name='password'
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex justify-end">
              {/*   <Button variant="outline">Crear cuenta</Button> */}
              <Button type='submit'>Iniciar sesión</Button>
            </CardFooter>
          </CardContent>
        </Card>
      </form>
    </div >
  )
}