import Image from 'next/image'

const ComfortSolutionSection = () => (
  <section className="flex flex-col md:flex-row items-center justify-between py-10 px-10 bg-blue-50/30 text-blue-400 ease-out">
    <div className="md:w-1/2 text-center md:text-left space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Fresco en Cualquier Espacio</h2>
      <p className="text-md md:text-lg ">
        Freddo es la unica empresa en México que ofrece un servicio todo incluido, que consta de la instalación de un
        aire acondicionado portátil con mantenimiento incluido. <br /> <br />
        Solo necesitas unos minutos para contratar, y nosotros nos encargamos del resto: <br /> <br /> instalación
        inmediata sin estrés para que solo te preocupes por disfrutar.
      </p>
      <button className="bg-blue-200 text-white px-6 py-3 rounded hover:scale-105 transition-transform">
        Contrata ahora
      </button>
    </div>
    <div className=" mt-8 md:mt-0 md:w-1/2 flex justify-end">
      <Image src="/assets/img-2.png" alt="Comfort image" width={500} height={400} className="rounded-lg shadow-md" />
    </div>
  </section>
)

export default ComfortSolutionSection
