"use client";

import Link from 'next/link';
import { Heart, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { ThemeToggle } from './ThemeToggle';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';


const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="hover:text-primary transition-colors text-lg md:text-sm">
        {children}
    </Link>
);

const Header = () => {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            setUsername(user?.username || null);
        }
    }, []);

    const navLinks = [
        { href: "/", text: "Home" },
        { href: "/about", text: "About Us" },
        { href: "/products", text: "Products" },
        { href: "/#faq", text: "Services" },
        { href: "/#contact", text: "Contacts" },
    ];

    return (
        <header className="bg-background/80 backdrop-blur-sm text-foreground sticky top-0 z-40 shadow-sm border-b">
            <div className="container mx-auto flex flex-wrap items-center justify-between px-2 sm:px-4 py-2 sm:py-4 gap-y-2">
                <Link href="/" className="flex items-center gap-2 min-w-0">
                    <Image src="https://raw.githubusercontent.com/EliGolam/furniture-shop/main/img/logo.png" alt="Shyam Furniture Logo" width={32} height={32} />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-headline font-bold truncate">Shyam Furniture</h1>
                </Link>

                <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium flex-wrap">
                    {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.text}</NavLink>)}
                </nav>

                <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
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
                    {mounted && username ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="ml-2 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span className="hidden md:inline">{username}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');
                                        window.location.href = "/";
                                    }}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : mounted ? (
                        <Link href="/auth/login" passHref>
                            <Button variant="outline" size="sm" className="ml-2 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span className="hidden md:inline">Login</span>
                            </Button>
                        </Link>
                    ) : null}
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
