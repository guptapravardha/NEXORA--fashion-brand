'use client';

import { use, useEffect, useState } from 'react';
import { products, formatPrice } from '@/lib/data';
import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) return <div className="pt-40 text-center uppercase tracking-widest text-xs">Collection Item Not Found</div>;

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-16 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <nav className="flex flex-wrap items-center gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-8 md:mb-12">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-2 h-2 md:w-3 md:h-3" />
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <ChevronRight className="w-2 h-2 md:w-3 md:h-3" />
          <span className="text-black truncate max-w-[150px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 mb-20 md:mb-32">
          <div className="lg:col-span-7 space-y-6 md:space-y-12">
            <div className="aspect-[3/4] bg-pearl overflow-hidden group">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                data-ai-hint={product.imageHint}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="aspect-[4/5] bg-pearl overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${product.id}detail1/800/1000`} 
                  alt="Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] bg-pearl overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${product.id}detail2/800/1000`} 
                  alt="Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 md:space-y-12 lg:sticky lg:top-32 self-start">
            <header className="space-y-4 md:space-y-6">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-gold font-black">{product.category} | {product.gender}&apos;s</span>
              <h1 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-wider leading-tight">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl font-headline font-bold">{formatPrice(product.price)}</p>
            </header>

            <div className="space-y-6 md:space-y-8">
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed uppercase tracking-widest font-body">
                {product.description}
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => {
                    addItem(product);
                    toast({ title: "Selection Updated", description: `${product.name} added to your selection.` });
                  }}
                  className="w-full rounded-none h-14 bg-black text-white hover:bg-gold transition-all duration-500 uppercase text-[10px] md:text-xs tracking-[0.3em] font-black flex items-center justify-center gap-4 group shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Add to Selection
                </Button>
                <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest font-medium">Complimentary Shipping & Artful Packaging</p>
              </div>
            </div>

            <div className="pt-10 md:pt-12 border-t border-black/5 space-y-6 md:space-y-8">
              <div className="flex items-start gap-4 md:gap-6 group">
                <Truck className="w-5 h-5 md:w-6 md:h-6 shrink-0 stroke-[1px] text-muted-foreground group-hover:text-gold transition-colors" />
                <div className="space-y-1">
                  <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold">Express Global Shipping</h4>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-widest">Complimentary for all Nexora members.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 md:gap-6 group">
                <RefreshCw className="w-5 h-5 md:w-6 md:h-6 shrink-0 stroke-[1px] text-muted-foreground group-hover:text-gold transition-colors" />
                <div className="space-y-1">
                  <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold">30-Day Returns</h4>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-widest">Seamless returns for a risk-free luxury experience.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 md:gap-6 group">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 shrink-0 stroke-[1px] text-muted-foreground group-hover:text-gold transition-colors" />
                <div className="space-y-1">
                  <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold">Authenticity Guaranteed</h4>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-widest">Every piece is verified and digitally cataloged.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="pt-16 md:pt-32 border-t border-black/5">
            <div className="flex justify-between items-end mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-headline font-black uppercase tracking-widest">Complementary Pieces</h2>
              <Link href="/shop" className="text-[9px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gold hover:border-gold transition-all">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}