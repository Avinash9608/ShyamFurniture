
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import VirtualTryOn from '@/components/VirtualTryOn';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';
import DeliveryCheck from './DeliveryCheck';

async function getProductById(id: string) {
    await dbConnect();
    try {
        const product = await Product.findById(id);
        if (!product) {
            return null;
        }
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        // Invalid MongoDB ObjectId format
        return null;
    }
}


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img: string, index: number) => (
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
           <div className="flex items-center gap-4">
              <p className="text-3xl font-headline font-semibold">${product.price.toFixed(2)}</p>
               {product.discountPrice && (
                <p className="text-xl font-headline text-muted-foreground line-through">${product.discountPrice.toFixed(2)}</p>
              )}
           </div>
           {product.rating > 0 && (
            <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                    {[...Array(Math.floor(product.rating))].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    {product.rating % 1 !== 0 && <Star key="half" className="h-5 w-5 " />}
                    {[...Array(5 - Math.ceil(product.rating))].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5" />)}
                </div>
                 <span className="text-muted-foreground text-sm">({product.reviewsCount} reviews)</span>
            </div>
           )}
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="flex gap-4">
            <AddToCartButton product={product} />
            <WishlistButton product={product} />
          </div>

          <DeliveryCheck />
        </div>
      </div>
      
      <div className="mt-12">
        <VirtualTryOn product={product} />
      </div>
    </div>
  );
}

