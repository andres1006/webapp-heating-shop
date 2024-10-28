import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Simulación de datos del producto (reemplaza esto con una consulta real a la base de datos)
  const products = [
    { id: '1', title: 'Aire Acondicionado Frío', description: 'Ideal para el verano', price: '$299.00', image: '/images/air1.jpg' },
    { id: '2', title: 'Aire Acondicionado Caliente', description: 'Perfecto para invierno', price: '$349.00', image: '/images/air2.jpg' },
  ];

  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  return NextResponse.json(product);
}