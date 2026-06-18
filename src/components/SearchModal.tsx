
'use client';

import { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products, Product, formatPrice } from '@/lib/data';
import Link from 'next/link';

export function SearchModal({ scrolled }: { scrolled: boolean }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredProducts = query.length > 2 
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group">
          <Search className={`w-5 h-5 stroke-[1px] transition-colors ${scrolled ? 'text-black' : 'text-white'} group-hover:text-gold`} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-white border-none rounded-none p-0 shadow-2xl">
        <div className="p-8 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-[10px] uppercase tracking-[0.5em] font-black mb-4">Search the Collection</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <Input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="border-none rounded-none text-3xl font-headline italic tracking-wide h-16 px-0 focus-visible:ring-0 placeholder:text-black/10"
            />
            <div className="h-[1px] w-full bg-black/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.3em] font-black mb-6 text-muted-foreground">Suggestions</h4>
              <ul className="space-y-4 text-sm uppercase tracking-widest font-bold">
                {['New Arrivals', 'Evening Gowns', 'Heritage Suits', 'Accessories'].map((s) => (
                  <li key={s} className="hover:text-gold cursor-pointer transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <Link href={`/shop?category=${s === 'New Arrivals' ? 'All' : s}`} onClick={() => setOpen(false)}>{s}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[9px] uppercase tracking-[0.3em] font-black mb-6 text-muted-foreground">Products ({filteredProducts.length})</h4>
              {filteredProducts.length > 0 ? (
                <div className="space-y-4">
                  {filteredProducts.map((p) => (
                    <Link 
                      key={p.id} 
                      href={`/product/${p.id}`} 
                      onClick={() => setOpen(false)}
                      className="flex gap-4 group"
                    >
                      <div className="w-12 h-16 bg-pearl shrink-0 overflow-hidden">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-widest font-bold">{p.name}</span>
                        <span className="text-[9px] text-muted-foreground">{formatPrice(p.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground italic">
                  {query.length > 0 ? 'No exact matches found' : 'Enter at least 3 characters'}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
