import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-background border-t text-foreground mt-12">
      <div className="container mx-auto px-2 sm:px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <span className="font-headline font-bold text-lg">Shyam Furniture</span>
          <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="text-sm">Contact: <a href="mailto:shyamfurniture@email.com" className="text-primary hover:underline">shyamfurniture@email.com</a></span>
          <span className="text-sm">Saharsa, Bihar, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
