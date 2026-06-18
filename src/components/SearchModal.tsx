'use client';

import { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products, Product, formatPrice } from '@/lib/data';
import Link from 'next/link';

export function SearchModal({ scrolled }: { scrolled: boolean }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (query.length < 2) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group p-1">
          <Search className={`w-5 h-5 stroke-[1px] transition-colors ${scrolled ? 'text-black' : 'text-white'} group-hover:text-gold`} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl bg-white border-none rounded-none p-0 shadow-[0_0_100px_rgba(0,0,0,0.2)]">
        <div className="p-12 space-y-12">
          <DialogHeader>
            <DialogTitle className="text-[10px] uppercase tracking-[0.5em] font-black text-gold mb-4">Search the World of Nexora</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <Input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What can we help you find?"
              className="border-none rounded-none text-4xl md:text-5xl font-headline italic tracking-tight h-24 px-0 focus-visible:ring-0 placeholder:text-black/5 bg-transparent"
            />
            <div className="h-[2px] w-full bg-black/5 overflow-hidden">
              <div 
                className="h-full bg-gold transition-all duration-500 ease-out" 
                style={{ width: query.length > 0 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4 space-y-10">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black mb-8 text-muted-foreground">Trending Now</h4>
                <ul className="space-y-6 text-xs uppercase tracking-[0.2em] font-black">
                  {['New Arrivals', 'Heritage Collection', 'Artisanal Footwear', 'Signature Accessories'].map((s) => (
                    <li key={s} className="hover:text-gold cursor-pointer transition-all flex items-center gap-4 group">
                      <div className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-8"></div>
                      <Link href={`/shop?category=${s.includes('Collection') ? 'All' : s.split(' ').pop()}`} onClick={() => setOpen(false)}>{s}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-black/5">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">
                  {query.length > 1 ? `Found ${filteredProducts.length} results` : 'Suggestions'}
                </h4>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredProducts.map((p) => (
                    <Link 
                      key={p.id} 
                      href={`/product/${p.id}`} 
                      onClick={() => setOpen(false)}
                      className="flex gap-6 group items-center bg-pearl/20 p-4 hover:bg-pearl/50 transition-colors"
                    >
                      <div className="w-20 h-28 bg-pearl shrink-0 overflow-hidden shadow-sm">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest font-black block leading-tight">{p.name}</span>
                        <span className="text-[9px] text-gold uppercase tracking-[0.2em] font-bold block">{p.category}</span>
                        <span className="text-[10px] font-black block">{formatPrice(p.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <Search className="w-8 h-8 text-black/5 stroke-[1px]" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground italic">
                    {query.length > 0 ? 'No matching pieces found in the collection' : 'Begin typing to search our curated universe'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
