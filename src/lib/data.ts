
import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
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
    imageUrl: getPlaceholder('her-1').imageUrl,
    imageHint: getPlaceholder('her-1').imageHint
  },
  {
    id: '2',
    name: 'Aurelia Velvet Clutch',
    price: 65000,
    category: 'Accessories',
    gender: 'Her',
    description: 'Lush velvet paired with a burnished gold clasp, this clutch is the ultimate companion for evening elegance.',
    imageUrl: getPlaceholder('her-2').imageUrl,
    imageHint: getPlaceholder('her-2').imageHint
  },
  {
    id: '3',
    name: 'Heritage Wool Suit',
    price: 245000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Exquisitely tailored from Italian merino wool, this two-piece suit offers a timeless silhouette and superior comfort.',
    imageUrl: getPlaceholder('him-1').imageUrl,
    imageHint: getPlaceholder('him-1').imageHint
  },
  {
    id: '4',
    name: 'NEXORA Chronograph I',
    price: 450000,
    category: 'Watches',
    gender: 'Him',
    description: 'A masterpiece of precision engineering featuring an automatic movement and sapphire crystal glass.',
    imageUrl: getPlaceholder('him-2').imageUrl,
    imageHint: getPlaceholder('him-2').imageHint
  },
  {
    id: '5',
    name: 'Signature Oxford Leather',
    price: 42000,
    category: 'Footwear',
    gender: 'Him',
    description: 'Hand-polished calfskin oxfords, combining traditional craftsmanship with modern ergonomics.',
    imageUrl: getPlaceholder('him-3').imageUrl,
    imageHint: getPlaceholder('him-3').imageHint
  },
  {
    id: '6',
    name: 'Luminous Diamond Pendant',
    price: 320000,
    category: 'Jewelry',
    gender: 'Her',
    description: 'A 2-carat ethically sourced diamond set in 18k white gold, capturing light from every angle.',
    imageUrl: getPlaceholder('her-3').imageUrl,
    imageHint: getPlaceholder('her-3').imageHint
  },
  {
    id: '7',
    name: 'Royal Cashmere Wrap',
    price: 115000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Ethically sourced cashmere coat with a self-tie belt and oversized lapels for a sophisticated layered look.',
    imageUrl: getPlaceholder('her-4').imageUrl,
    imageHint: getPlaceholder('her-4').imageHint
  },
  {
    id: '8',
    name: 'Gilded Silk Necktie',
    price: 12000,
    category: 'Accessories',
    gender: 'Him',
    description: '100% mulberry silk tie with a subtle jacquard pattern, perfect for professional and formal settings.',
    imageUrl: getPlaceholder('him-4').imageUrl,
    imageHint: getPlaceholder('him-4').imageHint
  },
  {
    id: '9',
    name: 'Noir Aviator Sunglasses',
    price: 35000,
    category: 'Accessories',
    gender: 'Unisex',
    description: 'Ultra-lightweight titanium frames with polarized lenses, offering timeless style and UV protection.',
    imageUrl: getPlaceholder('acc-1').imageUrl,
    imageHint: getPlaceholder('acc-1').imageHint
  },
  {
    id: '10',
    name: 'Monogram Pocket Square',
    price: 8500,
    category: 'Accessories',
    gender: 'Him',
    description: 'Hand-rolled silk pocket square featuring the NEXORA emblem in a minimalist tone-on-tone weave.',
    imageUrl: getPlaceholder('acc-2').imageUrl,
    imageHint: getPlaceholder('acc-2').imageHint
  },
  {
    id: '11',
    name: 'Lace Cathedral Dress',
    price: 210000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Chantilly lace overlay on a silk slip, perfect for avant-garde cocktail evenings.',
    imageUrl: getPlaceholder('her-5').imageUrl,
    imageHint: getPlaceholder('her-5').imageHint
  },
  {
    id: '12',
    name: 'Orbit Gold Hoops',
    price: 88000,
    category: 'Jewelry',
    gender: 'Her',
    description: 'Hammered 14k gold hoops that provide a modern twist on a classic accessory.',
    imageUrl: getPlaceholder('her-6').imageUrl,
    imageHint: getPlaceholder('her-6').imageHint
  },
  {
    id: '13',
    name: 'Midnight Tuxedo Jacket',
    price: 155000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Satin peak lapels and a slim fit, designed for the most exclusive evening affairs.',
    imageUrl: getPlaceholder('him-5').imageUrl,
    imageHint: getPlaceholder('him-5').imageHint
  },
  {
    id: '14',
    name: 'Sterling Geometric Cufflinks',
    price: 22000,
    category: 'Jewelry',
    gender: 'Him',
    description: 'Architectural cufflinks in sterling silver with a brushed finish.',
    imageUrl: getPlaceholder('him-6').imageUrl,
    imageHint: getPlaceholder('him-6').imageHint
  },
  {
    id: '15',
    name: 'Satin Stiletto Pumps',
    price: 72000,
    category: 'Footwear',
    gender: 'Her',
    description: '105mm heels draped in premium silk satin with an cushioned insole for comfort.',
    imageUrl: getPlaceholder('her-7').imageUrl,
    imageHint: getPlaceholder('her-7').imageHint
  },
  {
    id: '16',
    name: 'Metropolitan Leather Tote',
    price: 135000,
    category: 'Accessories',
    gender: 'Her',
    description: 'Full-grain pebble leather with multiple compartments for the modern professional woman.',
    imageUrl: getPlaceholder('her-8').imageUrl,
    imageHint: getPlaceholder('her-8').imageHint
  },
  {
    id: '17',
    name: 'Nordic Merino Knit',
    price: 48000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Heavyweight merino wool sweater with a unique textured weave for thermal regulation.',
    imageUrl: getPlaceholder('him-7').imageUrl,
    imageHint: getPlaceholder('him-7').imageHint
  },
  {
    id: '18',
    name: 'Commuter Messenger Bag',
    price: 98000,
    category: 'Accessories',
    gender: 'Him',
    description: 'Sleek leather messenger with a hidden magnetic closure and padded laptop sleeve.',
    imageUrl: getPlaceholder('him-8').imageUrl,
    imageHint: getPlaceholder('him-8').imageHint
  },
  {
    id: '19',
    name: 'Eden Silk Scarf',
    price: 28000,
    category: 'Accessories',
    gender: 'Her',
    description: 'Large square scarf with a hand-painted floral motif inspired by botanical gardens.',
    imageUrl: getPlaceholder('her-9').imageUrl,
    imageHint: getPlaceholder('her-9').imageHint
  },
  {
    id: '20',
    name: 'Ethereal Pearl Bracelet',
    price: 55000,
    category: 'Jewelry',
    gender: 'Her',
    description: 'Freshwater pearls strung with a solid gold clasp and a single diamond accent.',
    imageUrl: getPlaceholder('her-10').imageUrl,
    imageHint: getPlaceholder('her-10').imageHint
  },
  {
    id: '21',
    name: 'Riviera Driving Loafers',
    price: 36000,
    category: 'Footwear',
    gender: 'Him',
    description: 'Supple suede loafers with a flexible rubber pebble sole, ideal for casual luxury.',
    imageUrl: getPlaceholder('him-9').imageUrl,
    imageHint: getPlaceholder('him-9').imageHint
  },
  {
    id: '22',
    name: 'Exotic Alligator Wallet',
    price: 82000,
    category: 'Accessories',
    gender: 'Him',
    description: 'Bifold wallet crafted from ethically sourced alligator leather, developing a unique patina over time.',
    imageUrl: getPlaceholder('him-10').imageUrl,
    imageHint: getPlaceholder('him-10').imageHint
  },
  {
    id: '23',
    name: 'Gala Statement Choker',
    price: 195000,
    category: 'Jewelry',
    gender: 'Her',
    description: 'Bold interlocking gold links encrusted with micro-pavé crystals.',
    imageUrl: getPlaceholder('her-11').imageUrl,
    imageHint: getPlaceholder('her-11').imageHint
  },
  {
    id: '24',
    name: 'Velvet Plissee Skirt',
    price: 52000,
    category: 'Apparel',
    gender: 'Her',
    description: 'Midi-length pleated skirt with a high waistband and shimmering finish.',
    imageUrl: getPlaceholder('her-12').imageUrl,
    imageHint: getPlaceholder('her-12').imageHint
  },
  {
    id: '25',
    name: 'Rough-Cut Chelsea Boots',
    price: 45000,
    category: 'Footwear',
    gender: 'Him',
    description: 'Waxed leather boots with elasticated sides, built to last a lifetime.',
    imageUrl: getPlaceholder('him-11').imageUrl,
    imageHint: getPlaceholder('him-11').imageHint
  },
  {
    id: '26',
    name: 'Lux Nautical Tee',
    price: 18000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Supima cotton t-shirt with classic navy stripes and a refined boat neck.',
    imageUrl: getPlaceholder('him-12').imageUrl,
    imageHint: getPlaceholder('him-12').imageHint
  },
  {
    id: '27',
    name: 'Parisian Wool Beret',
    price: 15000,
    category: 'Accessories',
    gender: 'Her',
    description: '100% boiled wool beret, a chic finishing touch for any autumnal ensemble.',
    imageUrl: getPlaceholder('her-13').imageUrl,
    imageHint: getPlaceholder('her-13').imageHint
  },
  {
    id: '28',
    name: 'Stardust Crystal Sandals',
    price: 110000,
    category: 'Footwear',
    gender: 'Her',
    description: 'Strappy evening sandals adorned with over 500 hand-set Swarovski crystals.',
    imageUrl: getPlaceholder('her-14').imageUrl,
    imageHint: getPlaceholder('her-14').imageHint
  },
  {
    id: '29',
    name: 'Executive Cotton Chinos',
    price: 24000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Slim-straight chinos with a slight stretch for comfort without sacrificing sharp style.',
    imageUrl: getPlaceholder('him-13').imageUrl,
    imageHint: getPlaceholder('him-13').imageHint
  },
  {
    id: '30',
    name: 'Riviera Linen Shirt',
    price: 28000,
    category: 'Apparel',
    gender: 'Him',
    description: 'Breathable European linen in a relaxed fit, perfect for coastal escapes.',
    imageUrl: getPlaceholder('him-14').imageUrl,
    imageHint: getPlaceholder('him-14').imageHint
  }
];

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
