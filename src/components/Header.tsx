"use client";

import Link from 'next/link';
import { Heart, ShoppingCart, Sofa } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const Header = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Sofa className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">FurnishFlow</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-secondary-foreground/80 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-secondary-foreground/80 transition-colors">Products</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/wishlist" passHref>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <div className="relative">
                <Heart />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <div className="relative">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
