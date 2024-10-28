'use client'
import Filters from '@/components/organisms/filters';
import ProductList from '@/components/organisms/productList';
import { useState } from 'react';

const products = [
  { id: '1', title: 'Aire Acondicionado Frío', description: 'Ideal para el verano', price: '$299.00', image: '/images/air1.jpg' },
  { id: '2', title: 'Aire Acondicionado Caliente', description: 'Perfecto para invierno', price: '$349.00', image: '/images/air2.jpg' }
];

export default function ProductPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Nuestros Productos</h1>
      <Filters onSearch={setSearchQuery} />
      <ProductList products={filteredProducts} />
    </div>
  );
}