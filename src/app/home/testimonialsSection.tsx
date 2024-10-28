const testimonials = [
  { quote: "Excelente servicio, fue muy fácil hacer la compra y el equipo llegó con instalación incluida. ¡Súper recomendado!", name: "Cliente satisfecho" },
  { quote: "Muy práctico y rápido, además de contar con mantenimiento periódico sin preocuparme.", name: "Cliente satisfecho" },
];

const TestimonialsSection = () => (
  <section className="py-16 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-10">Opiniones de Clientes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <blockquote key={index} className="bg-gray-50 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 fade-in-up">
          <p className="text-gray-800 italic">"{testimonial.quote}"</p>
          <footer className="mt-4 text-gray-600 font-semibold">- {testimonial.name}</footer>
        </blockquote>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;