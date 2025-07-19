export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  materials: string[];
  colors: string[];
};

export type CartItem = Product & {
  quantity: number;
};

export type WishlistItem = Product;
