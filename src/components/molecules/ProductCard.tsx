import { FC } from 'react';
import Link from 'next/link';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

const ProductCard: FC<ProductCardProps> = ({ id, title, description, price, image }) => (
  <Card className='p-5'>
    <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-4" />
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-2">{description}</p>
    <p className="text-lg font-semibold mb-4">{price}</p>
    <Link href={`/products/${id}`}>
      <Button >
        action
      </Button>
    </Link>
  </Card>
);

export default ProductCard;