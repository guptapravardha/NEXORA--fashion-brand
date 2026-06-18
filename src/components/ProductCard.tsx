
'use client';

import Link from 'next/link';
import { Product, formatPrice } from '@/lib/data';
import { useCart } from '@/lib/store';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Selection Updated",
      description: `${product.name} added to your selection.`,
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] bg-pearl overflow-hidden mb-6">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          data-ai-hint={product.imageHint}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <button 
          onClick={handleAdd}
          className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-gold hover:text-white"
        >
          <Plus className="w-5 h-5 stroke-[1px]" />
        </button>

        <div className="absolute top-6 left-6">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
            {product.category}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{product.gender}&apos;s Collection</p>
          <p className="text-xs font-medium">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
