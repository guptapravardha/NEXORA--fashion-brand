
'use client';

import { Hero } from '@/components/home/Hero';
import { EditorialSection } from '@/components/home/EditorialSection';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-white">
      <Hero />
      
      <EditorialSection 
        title="Artisanal Mastery"
        subtitle="Heritage Series"
        image="https://picsum.photos/seed/nexora-editorial-1/1200/1600"
        hint="luxury atelier"
      />

      <section className="py-24 px-8 md:px-16 bg-pearl/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-wider">The Essentials</h2>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-[0.3em] font-bold border-b border-black pb-1 hover:text-gold hover:border-gold transition-all duration-300">
              Discover All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <EditorialSection 
        title="Modern Sophistication"
        subtitle="The Watchmaking Atelier"
        image="https://picsum.photos/seed/nexora-editorial-2/1200/1600"
        flipped={true}
        hint="luxury watchmaking"
      />

      <section className="h-[70vh] relative overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/nexora-footer/1920/800" 
          alt="Campaign" 
          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          data-ai-hint="fashion campaign"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-8 space-y-8 max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-widest leading-tight">
              Beyond Fashion. <br/> A Statement of Intent.
            </h3>
            <div className="pt-4">
              <Link href="/shop" className="inline-block px-12 py-5 bg-white text-black uppercase text-xs tracking-[0.3em] font-black hover:bg-gold hover:text-white transition-all duration-500">
                Join the World of Nexora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
