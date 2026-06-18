
'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialGender = searchParams.get('gender') as 'Her' | 'Him' | null;
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeGender, setActiveGender] = useState<'All' | 'Her' | 'Him'>(initialGender || 'All');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    if (initialGender) setActiveGender(initialGender);
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialGender, initialCategory]);

  const categories = ['All', 'Apparel', 'Accessories', 'Footwear', 'Jewelry', 'Watches'];

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeGender !== 'All') {
      result = result.filter(p => p.gender === activeGender || p.gender === 'Unisex');
    }
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeGender, activeCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 px-8 md:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Collection 2024</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-widest">
            {activeGender === 'All' ? 'The Entire World' : `${activeGender}'s World`}
          </h1>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-8 border-b border-black/5">
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Universe:</span>
              <div className="flex gap-4">
                {['All', 'Her', 'Him'].map((g) => (
                  <button 
                    key={g}
                    onClick={() => setActiveGender(g as any)}
                    className={`text-xs uppercase tracking-widest font-bold pb-1 transition-all ${activeGender === g ? 'text-black border-b-2 border-gold' : 'text-muted-foreground border-b-2 border-transparent hover:text-black'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-6 w-[1px] bg-black/10 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Category:</span>
              <div className="flex flex-wrap gap-4">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] uppercase tracking-widest font-bold pb-1 transition-all ${activeCategory === cat ? 'text-black border-b-2 border-gold' : 'text-muted-foreground border-b-2 border-transparent hover:text-black'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 self-end md:self-auto">
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{filteredProducts.length} Results</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-transparent">
                  Sort By <SlidersHorizontal className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none border-black/5 min-w-[200px]">
                <DropdownMenuItem onClick={() => setSortBy('featured')} className="text-[10px] uppercase tracking-widest font-bold py-3">Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low')} className="text-[10px] uppercase tracking-widest font-bold py-3">Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high')} className="text-[10px] uppercase tracking-widest font-bold py-3">Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-32 text-center space-y-6">
            <h3 className="text-xl font-headline font-bold uppercase tracking-widest text-muted-foreground">No matches found for your criteria</h3>
            <Button 
              variant="link" 
              onClick={() => { setActiveCategory('All'); setActiveGender('All'); }}
              className="uppercase text-xs tracking-widest text-gold"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center uppercase tracking-widest text-xs">Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
