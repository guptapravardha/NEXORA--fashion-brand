
import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: 'Apparel' | 'Accessories' | 'Footwear' | 'Jewelry' | 'Watches';
  gender: 'Her' | 'Him' | 'Unisex';
  description: string;
  imageUrl: string;
  imageHint: string;
};

const getPlaceholder = (id: string) => 
  PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];

export const products: Product[] = [
  {
    id: '1',
    name: 'Eleanor Silk Evening Gown',
    price: 185000,
    category: 'Apparel',
    gender: 'Her',
    description: 'A floor-length silk gown with delicate hand-stitched detailing, designed for high-end galas and formal events.',
    imageUrl: getPlaceholder('her-apparel-1').imageUrl,
    imageHint: getPlaceholder('her-apparel-1').imageHint
  },
  {
    id: '2',
    name: 'Aurelia Velvet Clutch',
    price: 65000,
    category: 'Accessories',
    gender: 'Her',
    description: 'Lush velvet paired with a burnished gold clasp, this clutch is the ultimate companion for evening elegance.',
    imageUrl: getPlaceholder('her-acc-1').imageUrl,
    imageHint: getPlaceholder('her-acc-1').imageHint
  },
  {
    id: '3',
    name: 'Heritage Wool Suit',
    price: 245000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Exquisitely tailored from Italian merino wool, this two-piece suit offers a timeless silhouette and superior comfort.',
    imageUrl: getPlaceholder('him-apparel-1').imageUrl,
    imageHint: getPlaceholder('him-apparel-1').imageHint
  },
  {
    id: '4',
    name: 'NEXORA Chronograph I',
    price: 450000,
    category: 'Watches',
    gender: 'Him',
    description: 'A masterpiece of precision engineering featuring an automatic movement and sapphire crystal glass.',
    imageUrl: getPlaceholder('him-acc-1').imageUrl,
    imageHint: getPlaceholder('him-acc-1').imageHint
  },
  {
    id: '5',
    name: 'Signature Oxford Leather',
    price: 42000,
    category: 'Footwear',
    gender: 'Him',
    description: 'Hand-polished calfskin oxfords, combining traditional craftsmanship with modern ergonomics.',
    imageUrl: getPlaceholder('him-shoes-1').imageUrl,
    imageHint: getPlaceholder('him-shoes-1').imageHint
  },
  {
    id: '6',
    name: 'Luminous Diamond Pendant',
    price: 320000,
    category: 'Jewelry',
    gender: 'Her',
    description: 'A 2-carat ethically sourced diamond set in 18k white gold, capturing light from every angle.',
    imageUrl: getPlaceholder('her-acc-2').imageUrl,
    imageHint: getPlaceholder('her-acc-2').imageHint
  },
  {
    id: '7',
    name: 'Royal Cashmere Wrap',
    price: 115000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Ethically sourced cashmere coat with a self-tie belt and oversized lapels for a sophisticated layered look.',
    imageUrl: getPlaceholder('her-apparel-2').imageUrl,
    imageHint: getPlaceholder('her-apparel-2').imageHint
  },
  {
    id: '8',
    name: 'Gilded Silk Necktie',
    price: 12000,
    category: 'Accessories',
    gender: 'Him',
    description: '100% mulberry silk tie with a subtle jacquard pattern, perfect for professional and formal settings.',
    imageUrl: getPlaceholder('him-acc-2').imageUrl,
    imageHint: getPlaceholder('him-acc-2').imageHint
  },
  {
    id: '9',
    name: 'Noir Aviator Sunglasses',
    price: 35000,
    category: 'Accessories',
    gender: 'Unisex',
    description: 'Ultra-lightweight titanium frames with polarized lenses, offering timeless style and UV protection.',
    imageUrl: getPlaceholder('unisex-acc-1').imageUrl,
    imageHint: getPlaceholder('unisex-acc-1').imageHint
  },
  {
    id: '10',
    name: 'Midnight Tuxedo Jacket',
    price: 155000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Satin peak lapels and a slim fit, designed for the most exclusive evening affairs.',
    imageUrl: getPlaceholder('him-apparel-2').imageUrl,
    imageHint: getPlaceholder('him-apparel-2').imageHint
  },
  {
    id: '11',
    name: 'Satin Stiletto Pumps',
    price: 72000,
    category: 'Footwear',
    gender: 'Her',
    description: '105mm heels draped in premium silk satin with an cushioned insole for comfort.',
    imageUrl: getPlaceholder('her-shoes-1').imageUrl,
    imageHint: getPlaceholder('her-shoes-1').imageHint
  },
  {
    id: '12',
    name: 'Rough-Cut Chelsea Boots',
    price: 45000,
    category: 'Footwear',
    gender: 'Him',
    description: 'Waxed leather boots with elasticated sides, built to last a lifetime.',
    imageUrl: getPlaceholder('him-shoes-2').imageUrl,
    imageHint: getPlaceholder('him-shoes-2').imageHint
  }
];

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace('INR', '₹');
};
