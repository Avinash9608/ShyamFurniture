
export type Product = {
  _id: string; // Changed from id: number to _id: string for MongoDB
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  features?: string[];
  colors?: string[];
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
  };
  availability: boolean;
  customizable: boolean;
  deliveryInfo?: string;
  rating: number;
  reviewsCount: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type WishlistItem = Product;

export type Offer = {
  _id: string;
  title: string;
  code: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};
