"use client";

import Link from 'next/link';
import { Heart, Search, ShoppingBag, User } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import Image from 'next/image';

const Header = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="bg-background/80 backdrop-blur-sm text-foreground sticky top-0 z-40 shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/logo.png" alt="Shyam Furniture Logo" width={32} height={32} />
          <h1 className="text-2xl font-headline font-bold">Shyam Furniture</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#about-us-call" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <Link href="/#faq" className="hover:text-primary transition-colors">Services</Link>
          <Link href="/#contact" className="hover:text-primary transition-colors">Contacts</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
           <Link href="/wishlist" passHref>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <div className="relative">
                <Heart />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <div className="relative">
                <ShoppingBag />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Button>
          </Link>
           <Button variant="ghost" size="icon" aria-label="User Account">
            <User />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
