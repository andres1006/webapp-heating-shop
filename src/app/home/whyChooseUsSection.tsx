const benefits = [
  { title: 'Instalación Incluida', description: 'Nosotros nos encargamos de que tu habitación permanezca fría en esta temporada de calor, tú solo relájate.', icon: '🛠️' },
  { title: 'Mantenimiento Cada 6 Meses', description: 'Olvídate de programaciones, nosotros te contactamos.', icon: '🔄' },
  { title: 'Proceso Rápido y Sencillo', description: 'Compra en minutos y disfruta de aire fresco sin complicaciones.', icon: '⚡' },
];

const WhyChooseUsSection = () => (
  <section className="py-16 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-10">Más que un Aire Acondicionado, un Servicio Completo</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {benefits.map((benefit, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
          <div className="text-5xl mb-4">{benefit.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUsSection;