"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl rounded-lg flex flex-col">
       <Link href={`/products/${product._id}`} className="flex flex-col flex-grow">
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={product.images[0] || 'https://placehold.co/800x600.png'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 text-left flex-grow">
          <CardTitle className="text-lg font-headline font-semibold mb-2 truncate">{product.name}</CardTitle>
          <CardDescription className="text-sm h-10 overflow-hidden text-ellipsis">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="text-lg font-semibold">
                ${product.price.toFixed(2)}
            </div>
        </CardFooter>
       </Link>
    </Card>
  );
};

export default ProductCard;
