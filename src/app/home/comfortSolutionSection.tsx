import Image from 'next/image';

const ComfortSolutionSection = () => (
  <section className="flex flex-col md:flex-row items-center justify-between py-16 px-6 bg-gray-100 text-gray-800">
    <div className="md:w-1/2 text-center md:text-left space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Fresco en Cualquier Espacio, Sin Complicaciones</h2>
      <p className="text-lg">Ofrecemos un servicio único en México, que consta de la instalación de un aire acondicionado portátil con mantenimiento incluido. Solo necesitas unos minutos para realizar tu compra, y nosotros nos encargamos del resto: instalación sin estrés y un mantenimiento cada 6 meses para que solo te preocupes por disfrutar.</p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded hover:scale-105 transition-transform">Ordena en un Par de Clicks</button>
    </div>
    <div className="mt-8 md:mt-0 md:w-1/2">
      <Image src="/images/comfort.jpg" alt="Comfort image" width={500} height={400} className="rounded-lg shadow-md" />
    </div>
  </section>
);

export default ComfortSolutionSection;