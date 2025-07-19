import type { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Modern Velvet Sofa',
    description: 'A sleek and comfortable sofa with plush velvet upholstery. Perfect for modern living rooms. Features a sturdy wooden frame and tapered legs.',
    price: 899.99,
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    materials: ['Velvet', 'Wood'],
    colors: ['Gray', 'Blue', 'Green'],
  },
  {
    id: 2,
    name: 'Minimalist Oak Coffee Table',
    description: 'Crafted from solid oak, this coffee table features clean lines and a minimalist design. Its spacious top and lower shelf provide ample storage.',
    price: 349.0,
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    materials: ['Oak Wood'],
    colors: ['Natural Oak'],
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    description: 'Stay comfortable during long work hours with this ergonomic office chair. It offers adjustable height, lumbar support, and a breathable mesh back.',
    price: 275.5,
    images: [
        'https://placehold.co/800x600.png',
        'https://placehold.co/800x600.png',
    ],
    materials: ['Mesh', 'Plastic', 'Metal'],
    colors: ['Black', 'White'],
  },
  {
    id: 4,
    name: 'Industrial Bookshelf',
    description: 'A stylish and sturdy bookshelf combining a metal frame with rustic wood shelves. It provides five tiers of shelving for books, decor, and more.',
    price: 450.0,
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    materials: ['Metal', 'Wood'],
    colors: ['Black/Brown'],
  },
  {
    id: 5,
    name: 'Scandinavian Dining Table',
    description: 'A beautiful dining table that seats up to six people. Its Scandinavian design features a white tabletop and angled solid wood legs.',
    price: 699.99,
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    materials: ['MDF', 'Beech Wood'],
    colors: ['White'],
  },
  {
    id: 6,
    name: 'Leather Accent Chair',
    description: 'Add a touch of sophistication with this genuine leather accent chair. Features a classic design with button-tufted details and a comfortable padded seat.',
    price: 599.0,
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    materials: ['Leather', 'Wood'],
    colors: ['Brown', 'Black'],
  },
];

export const allMaterials = [...new Set(products.flatMap(p => p.materials))];
export const allColors = [...new Set(products.flatMap(p => p.colors))];
