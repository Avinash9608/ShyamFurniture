"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
          <ShoppingCart className="h-10 w-10" /> Your Cart
        </h1>
        <p className="text-muted-foreground mt-2">{cartCount} items in your cart</p>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2 mb-4">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <Card key={item._id} className="overflow-hidden">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-2 md:mb-0">
                      <Link href={`/products/${item._id}`} className="hover:underline">
                        <h2 className="text-lg md:text-xl font-headline font-semibold">{item.name}</h2>
                      </Link>
                      <p className="text-md md:text-lg font-semibold text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 text-center border-x border-y-0"
                          min="1"
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                       <Button variant="destructive" size="icon" onClick={() => removeFromCart(item._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full gradient-cta hover:opacity-90">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
