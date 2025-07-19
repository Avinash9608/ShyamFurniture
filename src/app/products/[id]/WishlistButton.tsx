
"use client";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Heart } from "lucide-react";

export default function WishlistButton({ product }: { product: Product }) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product._id);

    const handleWishlistToggle = () => {
        if (isWishlisted) {
          removeFromWishlist(product._id);
        } else {
          addToWishlist(product);
        }
    };

    return (
        <Button size="lg" variant="outline" onClick={handleWishlistToggle} className={cn(isWishlisted && 'text-red-500 border-red-500 hover:text-red-500')}>
            <Heart className={cn('mr-2 h-5 w-5', isWishlisted && 'fill-current')} />
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
        </Button>
    )
}
