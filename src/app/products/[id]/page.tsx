'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Define la estructura del producto
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

// Función para obtener el producto desde una API o fuente de datos
async function fetchProduct(id: string): Promise<Product | null> {
  // Simulación de una llamada a una API para obtener detalles del producto
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const fetchedProduct = await fetchProduct(params.id);
      setProduct(fetchedProduct);
      setLoading(false);
    };
    loadProduct();
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-auto rounded-lg shadow-md" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">{product.price}</p>
          <Button onClick={() => alert('Configuración iniciada')} >
            Configurar
          </Button>
        </div>
      </div>
    </div>
  );
}