
'use client';

import { Hero } from '@/components/home/Hero';
import { EditorialSection } from '@/components/home/EditorialSection';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-white overflow-x-hidden">
      <Hero />
      
      <EditorialSection 
        title="Artisanal Mastery"
        subtitle="Heritage Series"
        image="https://picsum.photos/seed/nexora-editorial-her-1/1200/1600"
        hint="fashion model"
      />

      <section className="py-16 md:py-24 px-6 md:px-16 bg-pearl/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Curated Selection</span>
              <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-wider">The Essentials</h2>
            </div>
            <Link href="/shop" className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 hover:text-gold hover:border-gold transition-all duration-300">
              Discover All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <EditorialSection 
        title="Timeless Sophistication"
        subtitle="For Him"
        image="https://picsum.photos/seed/nexora-editorial-him-1/1200/1600"
        flipped={true}
        hint="mens luxury"
      />

      <section className="py-16 md:py-24 px-6 md:px-16 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">The Campaign</span>
            <h2 className="text-3xl md:text-6xl font-headline font-black uppercase tracking-widest leading-tight">
              Cinematic <br className="hidden md:block"/> Elegance
            </h2>
            <p className="text-xs md:text-sm text-white/60 uppercase tracking-widest leading-relaxed max-w-md mx-auto md:mx-0">
              A visual journey through the heart of European craftsmanship. Experience fashion as a movement, not just a garment.
            </p>
            <div className="pt-6 md:pt-8">
              <Link href="/shop" className="inline-block px-10 md:px-12 py-4 md:py-5 border border-white uppercase text-[10px] md:text-xs tracking-[0.3em] font-black hover:bg-white hover:text-black transition-all duration-500">
                Watch the Film
              </Link>
            </div>
          </div>
          <div className="aspect-video bg-white/5 relative overflow-hidden group">
             <img 
              src="https://picsum.photos/seed/nexora-video-thumb/1280/720" 
              alt="Fashion Campaign Film" 
              className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-1000"
              data-ai-hint="fashion film"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <div className="w-0 h-0 border-t-[6px] md:border-t-[8px] border-t-transparent border-l-[10px] md:border-l-[12px] border-l-white border-b-[6px] md:border-b-[8px] border-b-transparent ml-1"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialSection 
        title="Modern Grace"
        subtitle="For Her"
        image="https://picsum.photos/seed/nexora-editorial-her-2/1200/1600"
        hint="womens luxury"
      />

      <section className="h-[50vh] md:h-[70vh] relative overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/nexora-campaign-wide/1920/800" 
          alt="Campaign" 
          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          data-ai-hint="fashion runway"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6 space-y-6 md:space-y-8 max-w-2xl">
            <h3 className="text-2xl md:text-5xl font-headline font-black uppercase tracking-widest leading-tight">
              Beyond Fashion. <br/> A Statement of Intent.
            </h3>
            <div className="pt-2 md:pt-4">
              <Link href="/shop" className="inline-block px-10 md:px-12 py-4 md:py-5 bg-white text-black uppercase text-[10px] md:text-xs tracking-[0.3em] font-black hover:bg-gold hover:text-white transition-all duration-500">
                Join the World of Nexora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
