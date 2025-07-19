"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
          <Heart className="h-10 w-10" /> Your Wishlist
        </h1>
      </header>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-muted-foreground mt-2 mb-4">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${item.id}`} className="hover:underline">
                    <h2 className="text-xl font-headline font-semibold">{item.name}</h2>
                  </Link>
                  <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" onClick={() => handleMoveToCart(item)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Move to Cart
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => removeFromWishlist(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
