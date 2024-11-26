import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

const faqs = [
  {
    id: 1,
    question: '¿Cuánto tiempo se demora la instalación?',
    answer:
      'La instalación generalmente toma entre 2 a 4 horas, dependiendo de la complejidad del producto y las condiciones del lugar. Nuestro equipo se asegurará de realizar la instalación de manera eficiente y segura.'
  },
  {
    id: 2,
    question: '¿Qué tipos de pago aceptan?',
    answer:
      'Aceptamos pagos con tarjeta de crédito, débito, transferencias bancarias y pagos en efectivo. También ofrecemos opciones de financiamiento para facilitar su compra.'
  },
  {
    id: 3,
    question: '¿Puedo cambiar mi pedido después de haberlo confirmado?',
    answer:
      'Sí, puede realizar cambios en su pedido hasta 24 horas antes de la fecha de instalación programada. Por favor, contáctenos lo antes posible para realizar cualquier modificación.'
  },
  {
    id: 4,
    question: '¿Ofrecen garantía en sus productos?',
    answer:
      'Sí, todos nuestros productos vienen con una garantía de 2 años que cubre defectos de fabricación y problemas de instalación. Para más detalles, consulte nuestra política de garantía.'
  },
  {
    id: 5,
    question: '¿Cómo puedo rastrear el estado de mi pedido?',
    answer:
      'Puede rastrear el estado de su pedido iniciando sesión en su cuenta en nuestro sitio web. También recibirá actualizaciones por correo electrónico en cada etapa del proceso.'
  },
  {
    id: 6,
    question: '¿Qué debo hacer para preparar el área de instalación?',
    answer:
      'Le recomendamos despejar el área de instalación de muebles y objetos personales. Nuestro equipo se encargará de proteger el área durante el proceso de instalación.'
  },
  {
    id: 7,
    question: '¿Ofrecen servicios de mantenimiento?',
    answer:
      'Sí, ofrecemos servicios de mantenimiento para asegurar que su producto funcione correctamente a lo largo del tiempo. Puede programar una cita de mantenimiento a través de nuestro sitio web o contactándonos directamente.'
  },
  {
    id: 8,
    question: '¿Qué sucede si no estoy satisfecho con el producto?',
    answer:
      'Si no está satisfecho con el producto, ofrecemos una política de devolución de 30 días. Por favor, contáctenos para iniciar el proceso de devolución o cambio.'
  },
  {
    id: 9,
    question: '¿Cómo puedo contactar al servicio al cliente?',
    answer:
      'Puede contactarnos a través de nuestro formulario de contacto en el sitio web, por correo electrónico a soporte@ejemplo.com, o llamando a nuestro número de atención al cliente al +1 (832) 282‑5365.'
  },
  {
    id: 10,
    question: '¿Hay algún costo adicional por la instalación?',
    answer:
      'La instalación está incluida en el precio del producto. Sin embargo, si se requieren servicios adicionales, como modificaciones estructurales, estos pueden tener un costo adicional que se discutirá antes de proceder.'
  }
]

const FAQ = () => {
  return (
    <main className="w-full mx-auto">
      <section className="pt-16 p-4 ">
        <h1 className="text-center text-4xl font-bold my-5">Preguntas frecuentes</h1>
        <div className="md:px-[20%] flex flex-col gap-4">
          {faqs.map((faq) => (
            <Accordion type="single" collapsible>
              <AccordionItem value={faq.id.toString()}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </section>
      <section className="bg-blue-50/30 flex flex-col items-center py-4">
        <h2 className="text-center text-4xl font-bold my-5">¿Tienes alguna pregunta adicional?</h2>
        <p className="text-center text-gray-600">Si no encuentras la respuesta que buscas, no dudes en contactarnos.</p>
        <Link href="/contact" className="bg-blue-400 text-white px-4 py-2 rounded-md mt-10">
          Contactar
        </Link>
      </section>
    </main>
  )
}

export default FAQ
