"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/auth/login');
      return;
    }
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/auth/login');
      return;
    }
    addToCart(product); // Add to cart
    router.push('/cart'); // Redirect to cart page
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl rounded-lg flex flex-col h-full">
       <Link href={`/products/${product._id}`} className="flex flex-col flex-grow">
        <CardHeader className="p-0">
          <div className="relative h-40 sm:h-56 md:h-64 w-full">
            <Image
              src={product.images[0] || 'https://placehold.co/800x600.png'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 text-left flex-grow">
          <CardTitle className="text-base sm:text-lg font-headline font-semibold mb-2 truncate">{product.name}</CardTitle>
          <CardDescription className="text-xs sm:text-sm h-10 overflow-hidden text-ellipsis">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col gap-2 items-stretch">
          <div className="text-base sm:text-lg font-semibold mb-2">
            INR {product.price.toFixed(2)}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="default" className="flex-1" onClick={handleBuyNow}>Buy Now</Button>
          </div>
        </CardFooter>
       </Link>
    </Card>
  );
};

export default ProductCard;
