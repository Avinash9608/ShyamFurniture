"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);


export default function FloatingSupportButton() {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "+911234567890";
    const whatsappMessage = "Hello Shyam Furniture, I have a question.";

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="relative flex flex-col items-center gap-2">
                <div
                    className={cn(
                        "flex flex-col items-center gap-3 transition-all duration-300 ease-in-out",
                        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    )}
                >
                     <Link href={`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <span className="bg-background text-foreground text-sm rounded-md px-3 py-2 shadow-lg whitespace-nowrap">Chat on WhatsApp</span>
                        <Button size="icon" className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600">
                           <WhatsAppIcon className="w-6 h-6" />
                        </Button>
                     </Link>

                    <Link href={`tel:${phoneNumber}`} className="flex items-center gap-2">
                         <span className="bg-background text-foreground text-sm rounded-md px-3 py-2 shadow-lg whitespace-nowrap">Call Us</span>
                        <Button size="icon" className="rounded-full w-14 h-14">
                            <Phone className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>

                <Button
                    size="icon"
                    className="rounded-full w-16 h-16 shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
                </Button>
            </div>
        </div>
    );
}
