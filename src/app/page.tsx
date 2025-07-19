import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, User, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const popularProducts = products.slice(0, 6);
  const teamMembers = [
    { name: "John Doe", role: "Founder & CEO", image: "https://placehold.co/400x400.png", hint: "man portrait" },
    { name: "Jane Smith", role: "Lead Designer", image: "https://placehold.co/400x400.png", hint: "woman portrait" },
    { name: "Sam Wilson", role: "Operations Head", image: "https://placehold.co/400x400.png", hint: "person smiling" }
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] flex items-start justify-start text-foreground bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} data-ai-hint="modern stylish living room">
        <div className="absolute inset-0 bg-background/10" />
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
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">High-quality and Timeless pieces</h2>
              <p>Discover furniture that combines exceptional craftsmanship with enduring style. Each piece is designed to be a part of your home for years to come.</p>
              <Button asChild>
                <Link href="/about">About Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="md:w-1/2 h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group">
                <Image src="https://placehold.co/600x400.png" data-ai-hint="elegant interior design" alt="High-quality furniture" width={600} height={400} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
              <Image src="https://placehold.co/600x400.png" data-ai-hint="modern kitchen furniture" alt="Modern furniture design" width={600} height={400} className="w-full h-full object-cover" />
            </div>
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold">Built to Last and Modern</h2>
            <p>Our collections are a testament to modern design principles, focusing on clean lines, functionality, and sustainable materials that stand the test of time.</p>
            <Button asChild variant="outline">
              <Link href="/products">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <section id="sales" className="text-center">
          <h2 className="text-3xl font-bold mb-8">Popular Items On Sale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Button asChild className="mt-8">
            <Link href="/products">Explore More</Link>
          </Button>
        </section>

        <section id="about-shyam-furniture">
            <Card className="bg-card/80">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">🪑 About Shyam Furniture</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-center mx-auto">
                    <p>At Shyam Furniture, we believe your home deserves furniture that’s not just functional, but full of style, comfort, and character. We specialize in delivering premium-quality furniture with a strong commitment to service and satisfaction.</p>
                    <p>To keep up with today’s digital world, we’ve brought our entire collection online. Now, from the comfort of your home, you can explore our latest designs through our website or mobile application.</p>
                    <p className='font-semibold'>🛍️ See something you love?</p>
                    <p>Just send us your selected items via WhatsApp or Email, and our dedicated team will personally reach out to you within 24 hours to confirm and finalize your order.</p>
                    <p><strong>🚚 Currently, we deliver across the Saharsa region only.</strong></p>
                    <p>From handpicking the best designs to ensuring smooth delivery, our team is here to bring your vision to life — with the same trust and quality that define Shyam Furniture.</p>
                </CardContent>
            </Card>
        </section>

        <section id="team">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="relative h-56 bg-muted">
                    <Image src={member.image} alt={member.name} data-ai-hint={member.hint} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">Dedicated to bringing you the best furniture and service.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section id="closing" className="relative rounded-lg h-[50vh] bg-cover bg-center bg-no-repeat flex items-end justify-end p-8" style={{backgroundImage: "url('https://placehold.co/1200x400.png')"}}>
            <div className="bg-background/80 p-6 rounded-lg text-right max-w-md">
                <h2 className="text-3xl font-bold">Made for you</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
        </section>

        <section id="faq" className="max-w-3xl mx-auto">
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
