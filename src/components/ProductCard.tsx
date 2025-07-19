"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-headline font-semibold mb-2 truncate">{product.name}</CardTitle>
          <p className="text-xl font-bold font-headline">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button onClick={() => addToCart(product)} className="w-full mr-2">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleWishlistToggle}
          className={cn(isWishlisted && 'text-red-500 border-red-500 hover:text-red-500')}
          aria-label="Add to wishlist"
        >
          <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
