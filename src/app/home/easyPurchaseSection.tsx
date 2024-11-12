import { Button } from "@/components/ui/button";

const EasyPurchaseSection = () => (
  <section className="text-center py-16 px-6 bg-blue-50/30">
    <h2 className="text-3xl font-bold mb-4">Compra a Contado o Financia Fácilmente</h2>
    <p className="text-lg mb-6">Elige cómo prefieres pagar. Con un par de clics, tienes tu aire acondicionado listo, ya sea que pagues de inmediato o elijas cómodas cuotas mensuales.</p>
    <div className="space-x-4 flex gap-2 justify-center">
      <Button className="bg-blue-200 text-gray-100 px-6 py-3 rounded hover:scale-105 transition-transform shadow-md">Compra Ahora</Button>
      <Button className="bg-blue-100 text-gray-100 px-6 py-3 rounded hover:scale-105 transition-transform shadow-md">Simular Financiación</Button>
    </div>
  </section>
);

export default EasyPurchaseSection;