"use client";

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, ShoppingCart, Truck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import VirtualTryOn from '@/components/VirtualTryOn';
import { cn } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [pinCode, setPinCode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'available' | 'unavailable'>('idle');
  const { toast } = useToast();

  const product = products.find(p => p.id === parseInt(params.id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    notFound();
  }

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const checkDelivery = () => {
    if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
      // Mock logic: available for pincodes starting with '1', '2', '3'
      if (['1', '2', '3'].includes(pinCode.charAt(0))) {
        setDeliveryStatus('available');
      } else {
        setDeliveryStatus('unavailable');
      }
    } else {
      toast({
        title: "Invalid PIN Code",
        description: "Please enter a valid 6-digit PIN code.",
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 aspect-square relative">
                      <Image
                        src={img}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
          <p className="text-3xl font-headline font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="flex gap-4">
            <Button size="lg" onClick={() => addToCart(product)} className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleWishlistToggle} className={cn(isWishlisted && 'text-red-500 border-red-500 hover:text-red-500')}>
              <Heart className={cn('mr-2 h-5 w-5', isWishlisted && 'fill-current')} />
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </Button>
          </div>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-headline font-semibold text-lg">Check Delivery Availability</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter 6-digit PIN Code" 
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  maxLength={6}
                />
                <Button onClick={checkDelivery}>Check</Button>
              </div>
              {deliveryStatus === 'available' && <p className="text-green-600 flex items-center gap-2"><Truck className="h-4 w-4"/> Yay! Delivery is available to your location.</p>}
              {deliveryStatus === 'unavailable' && <p className="text-red-600 flex items-center gap-2"><Truck className="h-4 w-4"/> Sorry, delivery is not available to this PIN code yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12">
        <VirtualTryOn product={product} />
      </div>
    </div>
  );
}
