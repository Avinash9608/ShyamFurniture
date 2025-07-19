
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, User, Phone, Mail, Truck, ShieldCheck, Tag, MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
    tagline1: "Apka Ghar, Apka Style",
    tagline2: "Design Banaye Apke Sapno Ka Ghar"
  },
  {
    image: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
    tagline1: "Comfort Jo Mehsoos Ho",
    tagline2: "Quality Jo Bharosa De"
  },
  {
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
    tagline1: "Sundarta Bhi, Mazbooti Bhi",
    tagline2: "Furniture Banaye Apke Ghar Ko Khaas"
  },
  {
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc2fHxmdXJuaXR1cmV8ZW58MHx8MHx8fDA%3D",
    tagline1: "Ghar Ki Pehchaan",
    tagline2: "Shyam Furniture Ke Saath"
  }
];

const faqItems = [
    {
      value: "item-1",
      question: "Where is Shyam Furniture located?",
      answer: "Shyam Furniture is based in <strong>Saharsa, Bihar</strong>. We currently provide services and delivery within the Saharsa region."
    },
    {
      value: "item-2",
      question: "How can I place an order?",
      answer: "You can place an order by browsing our website or mobile app, selecting your desired furniture, and contacting us via <strong>WhatsApp</strong> or <strong>email</strong>. Our team will confirm your order within 24 hours."
    },
    {
      value: "item-3",
      question: "Do you offer home delivery?",
      answer: "Yes, we offer <strong>home delivery within Saharsa</strong>. Once your order is confirmed, our team will schedule and deliver your furniture to your doorstep."
    },
    {
      value: "item-4",
      question: "What types of furniture do you offer?",
      answer: "We offer a wide range of furniture for <strong>homes and offices</strong>, including beds, sofas, dining tables, wardrobes, office chairs, study tables, and more — combining <strong>traditional craftsmanship with modern design</strong>."
    },
    {
      value: "item-5",
      question: "Can I customize furniture according to my needs?",
      answer: "Yes, we do take <strong>custom orders</strong>. If you have specific design or size requirements, please get in touch with our team to discuss the options and pricing."
    },
    {
      value: "item-6",
      question: "How long does it take to deliver an order?",
      answer: "Delivery typically takes <strong>3–7 working days</strong> after order confirmation, depending on product availability and customization."
    },
    {
      value: "item-7",
      question: "What payment methods are available?",
      answer: "We accept payments via <strong>UPI, bank transfer, and cash on delivery (within Saharsa)</strong>. Payment details will be shared once your order is confirmed."
    },
    {
      value: "item-8",
      question: "Do you have a physical store I can visit?",
      answer: "Yes, we have a <strong>physical showroom in Saharsa</strong> where you can explore our furniture collection in person. Contact us for address and timings."
    },
    {
      value: "item-9",
      question: "Is there a return or exchange policy?",
      answer: "We currently offer <strong>returns or exchanges only for damaged or defective items</strong>, reported within 24 hours of delivery. Please contact our team for support."
    },
    {
      value: "item-10",
      question: "Do you plan to expand delivery beyond Saharsa?",
      answer: "Yes! We are working on expanding our delivery network to <strong>nearby cities in the upcoming year</strong>. Stay tuned for updates!"
    }
  ];

  const testimonials = [
  {
    name: "Ayush Raj",
    review: "Shyam Furniture truly exceeded my expectations. The quality and finish of the furniture is top-notch. Highly recommended!",
    avatar: "https://plus.unsplash.com/premium_photo-1691030254390-aa56b22e6a45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGJveSUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Sikha Singh",
    review: "I loved the traditional look with a modern twist. Ordering was simple and the delivery team was very professional.",
     avatar: "https://images.unsplash.com/photo-1628620835051-8f40f48c928d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGluZGlhbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Abhishek Yadav",
    review: "Their custom furniture service helped me design exactly what I wanted. Great experience from start to finish.",
     avatar: "https://images.unsplash.com/photo-1632820324313-ee2704746bfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc2fHxib3klMjBpbmRpYW58ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Amit Sahini",
    review: "High-quality materials and excellent customer support. Glad to have a trusted furniture store in Saharsa.",
     avatar: "https://images.unsplash.com/photo-1659538880931-1fed169f0974?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym95JTIwaW5kaWFufGVufDB8fDB8fHww"
  },
  {
    name: "Anupam Singh",
    review: "I ordered a bed set and it arrived on time and perfectly packed. Very satisfied with the service and price.",
     avatar: "https://plus.unsplash.com/premium_photo-1734603747053-05d95a534cdd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEzfHxib3klMjBpbmRpYW58ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Priya Chaubey",
    review: "Beautiful designs and very comfortable furniture. The online ordering system made everything super easy.",
     avatar: "https://plus.unsplash.com/premium_photo-1682092039530-584ae1d9da7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdpcmwlMjBpbmRpYW58ZW58MHx8MHx8fDA%3D"
  }
];


export default function Home() {
  const popularProducts = products.slice(0, 6);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnHover: true })
  );


  return (
    <div className="flex flex-col">
       <section className="relative h-[70vh] w-full overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={slide.image}
              alt="Background furniture"
              layout="fill"
              objectFit="cover"
              className={`w-full h-full ${index === currentSlide ? 'animate-scroll-left-to-right' : ''}`}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className={`absolute inset-0 flex flex-col items-start justify-center text-white p-4 md:p-8 lg:p-12 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg">
                <h1 className="text-3xl md:text-5xl font-headline font-bold mb-2">
                  {slide.tagline1}
                </h1>
                <p className="text-md md:text-xl font-body">
                  {slide.tagline2}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-0 left-0">
             <div className="animated-button-wrapper">
                <Link href="/products" className="animated-button">
                    Explore our products <ArrowRight className="ml-2 h-5 w-5"/>
                </Link>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        <section id="about-us-call" className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/eff87568-186c-4ef5-9096-31ab18cd1768.png" data-ai-hint="furniture store interior" alt="Stylish furniture in a modern living room" width={600} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6 md:order-1 text-left">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">🪑</span>
                  About Shyam Furniture
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                      At Shyam Furniture, we believe your home deserves furniture that’s not just functional, but full of style, comfort, and character. We specialize in delivering premium-quality furniture with a strong commitment to service and satisfaction.
                  </p>
                  <p>
                      To keep up with today’s digital world, we’ve brought our entire collection online. Now, from the comfort of your home, you can explore our latest designs through our website or mobile application.
                  </p>
                </div>
                <Link href="/about" className="animated-flip-button" data-text="Meet Our Team">
                    <span>Meet Our Team</span>
                </Link>
            </div>
        </section>

        <section id="claims" className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-primary mb-2"/>
              <h3 className="text-xl font-bold">Local Delivery</h3>
              <p className="text-muted-foreground">Currently serving the Saharsa region</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-primary mb-2"/>
              <h3 className="text-xl font-bold">Quality Assured</h3>
              <p className="text-muted-foreground">Legacy of trust and excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <Tag className="h-12 w-12 text-primary mb-2"/>
              <h3 className="text-xl font-bold">Personalized Service</h3>
              <p className="text-muted-foreground">Direct contact to finalize your order</p>
            </div>
        </section>

        <section id="learn-more" className="flex flex-col md:flex-row items-center gap-8">
           <div className="md:w-1/2 h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D" data-ai-hint="modern kitchen furniture" alt="Modern furniture design" width={600} height={400} className="w-full h-full object-cover" />
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
            <div className="mt-8 flex justify-center">
              <div className="voltage-button">
                <Link href="/products">
                  <button>Explore More</button>
                </Link>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 234.6 61.3" preserveAspectRatio="none">
                  <filter id="glow">
                    <feGaussianBlur className="blur" result="coloredBlur" stdDeviation={2} />
                    <feTurbulence type="fractalNoise" baseFrequency="0.075" numOctaves="0.3" result="turbulence" />
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={30} xChannelSelector="R" yChannelSelector="G" result="displace" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="displace" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <path className="voltage line-1" d="m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z" fill="transparent" stroke="#fff" />
                  <path className="voltage line-2" d="m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z" fill="transparent" stroke="#fff" />
                </svg>
                <div className="dots">
                  <div className="dot dot-1" />
                  <div className="dot dot-2" />
                  <div className="dot dot-3" />
                  <div className="dot dot-4" />
                  <div className="dot dot-5" />
                </div>
              </div>
            </div>
        </section>

        <section id="testimonials" className="w-full">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">🗣️ Customer Testimonials</h2>
                <p className="text-muted-foreground mt-2">What our customers say about Shyam Furniture</p>
            </div>
            <Carousel
                plugins={[autoplayPlugin.current]}
                opts={{ align: "start", loop: true }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <Card className="h-full flex flex-col">
                                <CardContent className="p-6 flex-1 flex flex-col items-center text-center">
                                    <Avatar className="w-20 h-20 mb-4 border-4 border-primary/20">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-muted-foreground italic">"{testimonial.review}"</p>
                                </CardContent>
                                <CardFooter className="flex flex-col items-center gap-2 pt-4 border-t">
                                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                                    </div>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex"/>
            </Carousel>
        </section>

        <section id="faq" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">🛋️ Frequently Asked Questions</h2>
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={activeAccordionItem ?? ""}
            onValueChange={setActiveAccordionItem}
          >
            {faqItems.map(item => (
                <AccordionItem 
                    key={item.value} 
                    value={item.value} 
                    onMouseEnter={() => setActiveAccordionItem(item.value)}
                    onMouseLeave={() => setActiveAccordionItem(null)}
                >
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                        <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </AccordionContent>
                </AccordionItem>
            ))}
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
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
                    <div className="flex flex-col items-center">
                        <Phone className="h-8 w-8 text-primary mb-2" />
                        <h3 className="font-bold">Phone</h3>
                        <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">+91 123 456 7890</a>
                    </div>
                    <div className="flex flex-col items-center">
                        <MapPin className="h-8 w-8 text-primary mb-2" />
                        <h3 className="font-bold">Address</h3>
                        <p className="text-muted-foreground">Main Market, Saharsa, Bihar, India</p>
                    </div>
                </div>
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
