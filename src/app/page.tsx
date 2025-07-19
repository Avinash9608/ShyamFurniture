import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} data-ai-hint="modern living room">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-4">
            Design Your Dream Space
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover exquisite furniture and bring your vision to life with our AI-powered virtual try-on.
          </p>
          <Link href="/products">
            <Button size="lg" className="gradient-cta hover:opacity-90 transition-opacity">
              Explore Collection
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-10">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
