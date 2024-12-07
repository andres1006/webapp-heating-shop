'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { phone } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaQuestionCircle, FaPhone, FaEnvelope } from 'react-icons/fa'

const Contact = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="w-full mx-auto">
      <section className="pt-16 bg-blue-50/30 p-4">
        <div className="text-center pt-8">
          <h1 className="text-5xl font-bold text-blue-400">Habla con Freedo</h1>
          <div className=" my-8 md:my-6 md:w-full flex justify-center ">
            <Image
              src="/assets/img-6.png"
              alt="Comfort image"
              width={500}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="mt-4 text-gray-700">
            La mayor parte de la información que necesitas se puede encontrar en nuestro sitio web. Para cualquier otra
            cosa, puedes hablar con nosotros a través de las siguientes opciones.
          </p>
          <div className="flex justify-center flex-wrap gap-8 mt-8">
            <Link
              href="/faq"
              className="flex w-[300px] max-w-md flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl text-blue-400 mb-4">
                <FaQuestionCircle />
              </div>
              <p className="text-lg font-medium">Preguntas frecuentes</p>
            </Link>
            <Link
              href={`tel:${phone}`}
              className="flex w-[300px] flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl text-blue-400 mb-4">
                <FaPhone />
              </div>
              <p className="text-lg font-medium">Llámanos al {phone}</p>
            </Link>
            <button
              onClick={() => setShowForm(true)}
              className="flex w-[300px] flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl text-blue-400 mb-4">
                <FaEnvelope />
              </div>
              <p className="text-lg font-medium">Déjanos tus datos</p>
            </button>
          </div>
        </div>
      </section>
      {showForm && (
        <section className="container mx-auto px-5 md:px-[10%] py-5">
          <h1 className="text-2xl font-bold text-blue-400 mb-4 text-center">Déjanos tus datos</h1>
          <p className="text-gray-700 mb-6 text-center">
            Complete el formulario a continuación y en breve un ejecutivo se comunicará contigo.
          </p>
          <p className="text-sm text-gray-500 mb-4">*Campos obligatorios</p>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre*</label>
                <Input type="text" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellidos*</label>
                <Input type="text" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo electrónico*</label>
                <Input type="email" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono*</label>
                <Input type="tel" required />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Código postal*</label>
              <Input type="text" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Escribe tu mensaje*</label>
              <Textarea required />
            </div>
            <div className="flex items-center mb-4">
              <Checkbox className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <Label className="ml-2 block text-sm text-gray-700">
                He leído y acepto el{' '}
                <a href="#" className="text-blue-600 underline">
                  Aviso de Privacidad
                </a>
              </Label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enviar
            </button>
          </form>
        </section>
      )}
    </main>
  )
}

export default Contact
