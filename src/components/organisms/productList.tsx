import { FC } from 'react';
import ProductCard from '../molecules/ProductCard';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
);

export default ProductList;