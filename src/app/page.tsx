import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Home() {
  const popularProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] flex items-start justify-start text-foreground bg-cover bg-center" style={{backgroundImage: "url('https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/pexels-emrecan-2079246.webp')"}} data-ai-hint="modern stylish living room">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-5 md:p-10 bg-background/80 rounded-br-2xl">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-2">
            Design your Comfort
          </h1>
          <p className="text-lg md:text-xl">
            Your Home, Your Style
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 z-10 p-3 bg-background/80 rounded-tr-2xl">
           <Link href="/products">
            <Button variant="link" className="text-base">Explore our products</Button>
          </Link>
        </div>
        <div className="absolute bottom-0 right-0 z-10 p-5 bg-background/80 rounded-tl-2xl max-w-sm hidden md:block">
            <h3 className="font-bold">Modern Designs</h3>
            <p className="text-sm text-muted-foreground">Discover furniture that combines exceptional craftsmanship with enduring style.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        <section id="about-us-call">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-4 text-left">
              <h2 className="text-3xl font-bold">High-quality and Timeless pieces</h2>
              <p>Discover furniture that combines exceptional craftsmanship with enduring style. Each piece is designed to be a part of your home for years to come.</p>
              <Button asChild>
                <Link href="/#faq">About Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="md:w-1/2 h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group">
                <Image src="https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/pexels-fotoaibe-1571460.webp" data-ai-hint="elegant interior design" alt="High-quality furniture" width={600} height={400} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
        </section>

        <section id="claims" className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">37</p>
              <p className="text-muted-foreground">Countries with stores</p>
            </div>
            <div>
              <p className="text-4xl font-bold">10k+</p>
              <p className="text-muted-foreground">Happy customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold">Worldwide</p>
              <p className="text-muted-foreground">Shipping</p>
            </div>
        </section>

        <section id="learn-more" className="flex flex-col md:flex-row-reverse items-center gap-8">
           <div className="md:w-1/2 h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/pexels-falling4utah-1080696.webp" data-ai-hint="modern kitchen furniture" alt="Modern furniture design" width={600} height={400} className="w-full h-full object-cover" />
            </div>
          <div className="md:w-1/2 space-y-4 text-left">
            <h2 className="text-3xl font-bold">Built to Last and Modern</h2>
            <p>Our collections are a testament to modern design principles, focusing on clean lines, functionality, and sustainable materials that stand the test of time.</p>
            <Button asChild variant="outline">
              <Link href="/products">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <section id="sales" className="text-center">
          <h2 className="text-3xl font-bold mb-8">Popular Items On Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Button asChild className="mt-8">
            <Link href="/products">Explore More</Link>
          </Button>
        </section>

        <section id="video-promo">
            <div className="aspect-video rounded-lg overflow-hidden">
             <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/tgbNymZ7vqY" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
            </div>
        </section>
        
        <section id="closing" className="relative rounded-lg h-[50vh] bg-cover bg-center bg-no-repeat flex items-end justify-end p-8" style={{backgroundImage: "url('https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/pexels-valeriya-1129413.webp')"}}>
            <div className="bg-background/80 p-6 rounded-lg text-right max-w-md">
                <h2 className="text-3xl font-bold">Made for you</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
        </section>

        <section id="faq" className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>Our return policy allows you to return items within 30 days of purchase. Items must be in original condition with all tags attached. Please see our full return policy for more details.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I track my order?</AccordionTrigger>
              <AccordionContent>You can track your order by logging into your account and viewing the order details. A tracking number will be provided once the order has been shipped.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
              <AccordionContent>Yes, we offer international shipping to many countries. Please check our shipping information page for details on available destinations and shipping rates.</AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
              <AccordionContent>You can contact our customer support team via email at support@shyamfurniture.com or call us at (123) 456-7890. Our support hours are Monday to Friday, 9 AM to 5 PM.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section id="location" className="w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57333.72979689434!2d86.5642918408425!3d25.88839016997184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee758ef53c1339%3A0x8f4fed3fd986f73!2sSaharsa%2C%20Bihar%2C%20India!5e0!3m2!1sen!2sus!4v1722442225330!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section id="contact" className="max-w-3xl mx-auto w-full">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Contact Us</CardTitle>
              <CardDescription>Have a question? We'd love to hear from you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Name" />
                  <Input type="email" placeholder="Email" />
                </div>
                <Textarea placeholder="Message" rows={5} />
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send Message</Button>
            </CardFooter>
          </Card>
        </section>

      </div>
    </div>
  );
}
