
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
  // Women's Apparel (10)
  {
    id: 'w1',
    name: 'Eleanor Silk Evening Gown',
    price: 185000,
    category: 'Apparel',
    gender: 'Her',
    description: 'A floor-length silk gown with delicate hand-stitched detailing, designed for high-end galas.',
    imageUrl: getPlaceholder('her-apparel-1').imageUrl,
    imageHint: getPlaceholder('her-apparel-1').imageHint
  },
  {
    id: 'w2',
    name: 'Royal Cashmere Wrap',
    price: 115000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Ethically sourced cashmere coat with a self-tie belt and oversized lapels.',
    imageUrl: getPlaceholder('her-apparel-2').imageUrl,
    imageHint: getPlaceholder('her-apparel-2').imageHint
  },
  {
    id: 'w3',
    name: 'Silk Satin Blouse',
    price: 45000,
    category: 'Apparel',
    gender: 'Her',
    description: 'A liquid-silk satin blouse featuring a draped neckline and mother-of-pearl buttons.',
    imageUrl: getPlaceholder('her-apparel-3').imageUrl,
    imageHint: getPlaceholder('her-apparel-3').imageHint
  },
  {
    id: 'w4',
    name: 'Velvet Midi Skirt',
    price: 58000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Lush Italian velvet midi skirt with a subtle side slit for modern movement.',
    imageUrl: getPlaceholder('her-apparel-4').imageUrl,
    imageHint: getPlaceholder('her-apparel-4').imageHint
  },
  {
    id: 'w5',
    name: 'Embroidered Lace Dress',
    price: 142000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Intricately embroidered lace gown with a sheer neckline and artisanal finishing.',
    imageUrl: getPlaceholder('her-apparel-5').imageUrl,
    imageHint: getPlaceholder('her-apparel-5').imageHint
  },
  {
    id: 'w6',
    name: 'Cashmere Turtleneck',
    price: 38000,
    category: 'Apparel',
    gender: 'Her',
    description: 'A staple of luxury: ultra-soft cashmere turtleneck in a timeless cream hue.',
    imageUrl: getPlaceholder('her-apparel-6').imageUrl,
    imageHint: getPlaceholder('her-apparel-6').imageHint
  },
  {
    id: 'w7',
    name: 'Tailored Wool Trousers',
    price: 52000,
    category: 'Apparel',
    gender: 'Her',
    description: 'High-waisted wool trousers with a precision-tailored wide leg silhouette.',
    imageUrl: getPlaceholder('her-apparel-7').imageUrl,
    imageHint: getPlaceholder('her-apparel-7').imageHint
  },
  {
    id: 'w8',
    name: 'Quilted Leather Jacket',
    price: 128000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Hand-quilted lambskin leather jacket with burnished gold hardware.',
    imageUrl: getPlaceholder('her-apparel-8').imageUrl,
    imageHint: getPlaceholder('her-apparel-8').imageHint
  },
  {
    id: 'w9',
    name: 'Chiffon Maxi Dress',
    price: 95000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Flowing silk chiffon dress featuring a hand-painted floral archive print.',
    imageUrl: getPlaceholder('her-apparel-9').imageUrl,
    imageHint: getPlaceholder('her-apparel-9').imageHint
  },
  {
    id: 'w10',
    name: 'Sequin Party Jumpsuit',
    price: 165000,
    category: 'Apparel',
    gender: 'Her',
    description: 'A show-stopping evening jumpsuit embellished with thousands of hand-applied sequins.',
    imageUrl: getPlaceholder('her-apparel-10').imageUrl,
    imageHint: getPlaceholder('her-apparel-10').imageHint
  },

  // Men's Apparel (10)
  {
    id: 'm1',
    name: 'Heritage Wool Suit',
    price: 245000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Exquisitely tailored from Italian merino wool, this suit offers a timeless silhouette.',
    imageUrl: getPlaceholder('him-apparel-1').imageUrl,
    imageHint: getPlaceholder('him-apparel-1').imageHint
  },
  {
    id: 'm2',
    name: 'Midnight Tuxedo Jacket',
    price: 155000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Satin peak lapels and a slim fit, designed for the most exclusive evening affairs.',
    imageUrl: getPlaceholder('him-apparel-2').imageUrl,
    imageHint: getPlaceholder('him-apparel-2').imageHint
  },
  {
    id: 'm3',
    name: 'Egyptian Cotton Shirt',
    price: 22000,
    category: 'Apparel',
    gender: 'Him',
    description: 'The finest 2-ply Egyptian cotton shirt with a crisp spread collar.',
    imageUrl: getPlaceholder('him-apparel-3').imageUrl,
    imageHint: getPlaceholder('him-apparel-3').imageHint
  },
  {
    id: 'm4',
    name: 'Cashmere Overcoat',
    price: 285000,
    category: 'Apparel',
    gender: 'Him',
    description: 'A majestic overcoat crafted from heavyweight pure cashmere.',
    imageUrl: getPlaceholder('him-apparel-4').imageUrl,
    imageHint: getPlaceholder('him-apparel-4').imageHint
  },
  {
    id: 'm5',
    name: 'Leather Biker Jacket',
    price: 195000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Hand-treated full-grain leather jacket with custom Nexora hardware.',
    imageUrl: getPlaceholder('him-apparel-5').imageUrl,
    imageHint: getPlaceholder('him-apparel-5').imageHint
  },
  {
    id: 'm6',
    name: 'Merino Wool Polo',
    price: 32000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Long-sleeve polo knitted from ultra-fine merino wool with a seamless collar.',
    imageUrl: getPlaceholder('him-apparel-6').imageUrl,
    imageHint: getPlaceholder('him-apparel-6').imageHint
  },
  {
    id: 'm7',
    name: 'Tailored Linen Blazer',
    price: 88000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Breathable Irish linen blazer, unconstructed for effortless summer elegance.',
    imageUrl: getPlaceholder('him-apparel-7').imageUrl,
    imageHint: getPlaceholder('him-apparel-7').imageHint
  },
  {
    id: 'm8',
    name: 'Corduroy Trouser',
    price: 42000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Premium fine-wale corduroy trousers in a rich earthy tone.',
    imageUrl: getPlaceholder('him-apparel-8').imageUrl,
    imageHint: getPlaceholder('him-apparel-8').imageHint
  },
  {
    id: 'm9',
    name: 'Silk Smoking Jacket',
    price: 215000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Quilted silk lapels and a jacquard body for the ultimate in at-home luxury.',
    imageUrl: getPlaceholder('him-apparel-9').imageUrl,
    imageHint: getPlaceholder('him-apparel-9').imageHint
  },
  {
    id: 'm10',
    name: 'Velvet Dinner Blazer',
    price: 135000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Rich burgundy velvet blazer with satin-faced peak lapels.',
    imageUrl: getPlaceholder('him-apparel-10').imageUrl,
    imageHint: getPlaceholder('him-apparel-10').imageHint
  },

  // Others
  {
    id: '11',
    name: 'Aurelia Velvet Clutch',
    price: 65000,
    category: 'Accessories',
    gender: 'Her',
    description: 'Lush velvet paired with a burnished gold clasp, the ultimate evening companion.',
    imageUrl: getPlaceholder('her-acc-1').imageUrl,
    imageHint: getPlaceholder('her-acc-1').imageHint
  },
  {
    id: '12',
    name: 'NEXORA Chronograph I',
    price: 450000,
    category: 'Watches',
    gender: 'Him',
    description: 'A masterpiece of precision engineering featuring an automatic movement.',
    imageUrl: getPlaceholder('him-acc-1').imageUrl,
    imageHint: getPlaceholder('him-acc-1').imageHint
  },
  {
    id: '13',
    name: 'Signature Oxford Leather',
    price: 42000,
    category: 'Footwear',
    gender: 'Him',
    description: 'Hand-polished calfskin oxfords, combining traditional craftsmanship.',
    imageUrl: getPlaceholder('him-shoes-1').imageUrl,
    imageHint: getPlaceholder('him-shoes-1').imageHint
  },
  {
    id: '14',
    name: 'Luminous Diamond Pendant',
    price: 320000,
    category: 'Jewelry',
    gender: 'Her',
    description: 'A 2-carat ethically sourced diamond set in 18k white gold.',
    imageUrl: getPlaceholder('her-acc-2').imageUrl,
    imageHint: getPlaceholder('her-acc-2').imageHint
  },
  {
    id: '15',
    name: 'Satin Stiletto Pumps',
    price: 72000,
    category: 'Footwear',
    gender: 'Her',
    description: '105mm heels draped in premium silk satin with an cushioned insole.',
    imageUrl: getPlaceholder('her-shoes-1').imageUrl,
    imageHint: getPlaceholder('her-shoes-1').imageHint
  }
];

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace('INR', '₹');
};
