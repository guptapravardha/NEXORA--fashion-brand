'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
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
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 md:mb-20 space-y-4 md:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Collection 2024</span>
          <h1 className="text-4xl md:text-7xl font-headline font-black uppercase tracking-widest leading-tight">
            {activeGender === 'All' ? 'The Entire World' : `${activeGender}'s World`}
          </h1>
        </header>

        <div className="flex flex-col gap-8 mb-12 pb-6 border-b border-black/5">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Universe:</span>
                <div className="flex gap-4">
                  {['All', 'Her', 'Him'].map((g) => (
                    <button 
                      key={g}
                      onClick={() => setActiveGender(g as any)}
                      className={`text-[10px] md:text-xs uppercase tracking-widest font-bold pb-1 transition-all ${activeGender === g ? 'text-black border-b-2 border-gold' : 'text-muted-foreground border-b-2 border-transparent hover:text-black'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="hidden md:block h-6 w-[1px] bg-black/10"></div>

              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Category:</span>
                <div className="flex flex-wrap gap-4">
                  {/* On mobile we might want a dropdown for categories if there are too many */}
                  <div className="hidden sm:flex gap-4">
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
                  <div className="sm:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto p-0 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
                          {activeCategory} <ChevronDown className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-none border-black/5">
                        {categories.map((cat) => (
                          <DropdownMenuItem key={cat} onClick={() => setActiveCategory(cat)} className="text-[9px] uppercase tracking-widest font-bold">
                            {cat}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-black/5">
              <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">{filteredProducts.length} Results</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-0 text-[10px] md:text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-transparent">
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
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h3 className="text-lg font-headline font-bold uppercase tracking-widest text-muted-foreground">No matches found</h3>
            <Button 
              variant="link" 
              onClick={() => { setActiveCategory('All'); setActiveGender('All'); }}
              className="uppercase text-[10px] tracking-widest text-gold"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-20">
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