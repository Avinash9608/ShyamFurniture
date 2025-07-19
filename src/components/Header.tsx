"use client";

import Link from 'next/link';
import { Heart, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import Image from 'next/image';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { ThemeToggle } from './ThemeToggle';


const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="hover:text-primary transition-colors text-lg md:text-sm">
        {children}
    </Link>
);

const Header = () => {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", text: "Home" },
        { href: "/about", text: "About Us" },
        { href: "/products", text: "Products" },
        { href: "/#faq", text: "Services" },
        { href: "/#contact", text: "Contacts" },
    ];

    return (
        <header className="bg-background/80 backdrop-blur-sm text-foreground sticky top-0 z-40 shadow-sm border-b">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/logo.png" alt="Shyam Furniture Logo" width={32} height={32} />
                    <h1 className="text-xl md:text-2xl font-headline font-bold">Shyam Furniture</h1>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.text}</NavLink>)}
                </nav>

                <div className="flex items-center gap-1 md:gap-2">
                    <Button variant="ghost" size="icon" aria-label="Search" className="hidden md:inline-flex">
                        <Search />
                    </Button>
                    <Link href="/wishlist" passHref>
                        <Button variant="ghost" size="icon" aria-label="Wishlist">
                            <div className="relative">
                                <Heart />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </div>
                        </Button>
                    </Link>
                    <Link href="/cart" passHref>
                        <Button variant="ghost" size="icon" aria-label="Shopping Cart">
                            <div className="relative">
                                <ShoppingBag />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Button>
                    </Link>
                    <ThemeToggle />
                    <div className="md:hidden">
                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-sm">
                                <nav className="flex flex-col gap-6 pt-16">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <NavLink href={link.href}>{link.text}</NavLink>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
