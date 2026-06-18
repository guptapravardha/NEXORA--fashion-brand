
'use client';

import { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products, Product, formatPrice } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
          <Search className={cn("w-5 h-5 md:w-6 md:h-6 stroke-[1.2px] transition-colors", scrolled ? "text-black" : "text-white", "group-hover:text-gold")} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] bg-white border-none rounded-none p-0 shadow-2xl">
        <div className="p-6 md:p-12 space-y-8 md:space-y-12">
          <DialogHeader>
            <DialogTitle className="text-[10px] uppercase tracking-[0.5em] font-black text-gold mb-2">Search The Collection</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <Input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Seeking something specific?"
              className="border-none rounded-none text-2xl md:text-5xl font-headline italic tracking-tight h-16 md:h-24 px-0 focus-visible:ring-0 placeholder:text-black/10 bg-transparent"
            />
            <div className="h-[1.5px] w-full bg-black/5 overflow-hidden">
              <div 
                className="h-full bg-gold transition-all duration-500 ease-out" 
                style={{ width: query.length > 0 ? '100%' : '0%' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="md:col-span-4 space-y-8">
              <div>
                <h4 className="text-[9px] uppercase tracking-[0.3em] font-black mb-6 text-muted-foreground">Universe</h4>
                <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-black">
                  {['Apparel', 'Accessories', 'Footwear', 'Jewelry'].map((s) => (
                    <li key={s} className="hover:text-gold cursor-pointer transition-all flex items-center gap-3 group">
                      <div className="w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-6"></div>
                      <Link href={`/shop?category=${s}`} onClick={() => setOpen(false)}>{s}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-black/5">
                <h4 className="text-[9px] uppercase tracking-[0.3em] font-black text-muted-foreground">
                  {query.length > 1 ? `Catalogue (${filteredProducts.length})` : 'Refined Suggestions'}
                </h4>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredProducts.map((p) => (
                    <Link 
                      key={p.id} 
                      href={`/product/${p.id}`} 
                      onClick={() => setOpen(false)}
                      className="flex gap-4 group items-center bg-pearl/20 p-3 hover:bg-pearl/50 transition-colors"
                    >
                      <div className="w-14 h-20 bg-pearl shrink-0 overflow-hidden">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest font-black block line-clamp-1">{p.name}</span>
                        <span className="text-[8px] text-gold uppercase tracking-widest font-bold block">{p.category}</span>
                        <span className="text-[10px] font-black block">{formatPrice(p.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <Search className="w-6 h-6 text-black/10 stroke-[1px]" />
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground italic max-w-[200px]">
                    {query.length > 0 ? 'No curated matches found' : 'Enter criteria to explore the Nexora universe'}
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
