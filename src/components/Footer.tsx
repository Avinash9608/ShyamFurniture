import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
             <Link href="/" className="flex items-center gap-2">
                <Image src="https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/logo.png" alt="Shyam Furniture Logo" width={32} height={32} />
                <h1 className="text-2xl font-headline font-bold">Shyam Furniture</h1>
            </Link>
            <p className="text-sm text-muted-foreground">
              Crafting comfortable and stylish spaces for modern living. Discover timeless furniture designed to last.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline font-semibold">Quicklinks</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contacts</Link></li>
            </ul>
          </div>
           <div className="space-y-4">
            <h3 className="font-headline font-semibold">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">Trend</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Discount</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Featured</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">New</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline font-semibold">Company</h3>
            <div className="flex gap-4">
                <Link href="#" aria-label="Twitter">
                    <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
                <Link href="#" aria-label="Facebook">
                    <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
                <Link href="#" aria-label="Instagram">
                    <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shyam Furniture. All rights reserved.</p>
          <Link href="#" className="hover:text-primary transition-colors">Terms & Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
