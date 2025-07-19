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
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl rounded-2xl">
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
        <CardContent className="p-4 text-left">
          <CardTitle className="text-lg font-headline font-semibold mb-2 truncate">{product.name}</CardTitle>
          <p className="text-muted-foreground text-sm h-10 overflow-hidden">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/products/${product.id}`}>View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
