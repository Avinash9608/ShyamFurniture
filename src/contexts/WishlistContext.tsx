"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect } from 'react';
import type { Product, WishlistItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item._id === product._id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
    toast({
      title: "Removed from wishlist",
      description: `Item has been removed from your wishlist.`,
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item._id === productId);
  };
  
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};
