'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, Sparkles, Search, User } from 'lucide-react';
import { useCart } from '@/lib/store';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { formatPrice } from '@/lib/data';
import { StylistModal } from './ai/StylistModal';
import { SearchModal } from './SearchModal';
import { AuthModal } from './auth/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { cart, total, itemCount, removeItem, updateQuantity } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ShopDropdown = ({ gender }: { gender: 'Her' | 'Him' }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-gold transition-colors outline-none uppercase tracking-[0.2em]">
        For {gender}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border-black/5 rounded-none min-w-[200px] p-2 mt-4 shadow-xl">
        <DropdownMenuItem asChild>
          <Link href={`/shop?gender=${gender}&category=Apparel`} className="text-[10px] uppercase tracking-widest font-bold py-4 cursor-pointer block hover:text-gold transition-colors">Apparel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/shop?gender=${gender}&category=Accessories`} className="text-[10px] uppercase tracking-widest font-bold py-4 cursor-pointer block hover:text-gold transition-colors">Accessories</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/shop?gender=${gender}&category=Footwear`} className="text-[10px] uppercase tracking-widest font-bold py-4 cursor-pointer block hover:text-gold transition-colors">Shoes</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 py-6 px-8 md:px-16 flex items-center justify-between",
      scrolled ? "bg-white/95 backdrop-blur-md py-4 border-b border-black/5 shadow-sm" : "bg-transparent text-white"
    )}>
      <div className={cn("flex items-center gap-10", scrolled ? "text-black" : "text-white")}>
        <div className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-black">
          <ShopDropdown gender="Her" />
          <ShopDropdown gender="Him" />
          <Link href="/shop" className="hover:text-gold transition-all duration-300 relative group">
            The World of Nexora
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <button className="lg:hidden">
          <Menu className="w-5 h-5 stroke-[1px]" />
        </button>
      </div>

      <Link href="/" className={cn("absolute left-1/2 -translate-x-1/2 transition-transform duration-500 hover:scale-105", scrolled ? "text-black" : "text-white")}>
        <h1 className="text-2xl md:text-4xl font-headline tracking-[0.2em] font-black uppercase">Nexora</h1>
      </Link>

      <div className={cn("flex items-center gap-8", scrolled ? "text-black" : "text-white")}>
        <StylistModal />
        
        <SearchModal scrolled={scrolled} />
        
        <AuthModal scrolled={scrolled} />

        <Sheet>
          <SheetTrigger asChild>
            <button className="relative group p-1">
              <ShoppingBag className="w-5 h-5 stroke-[1px] group-hover:text-gold transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md p-0 flex flex-col border-l-0 shadow-2xl">
            <SheetHeader className="p-8 border-b border-black/5 bg-pearl/30">
              <SheetTitle className="text-sm uppercase tracking-[0.3em] font-headline font-black">Your Selection</SheetTitle>
            </SheetHeader>
            
            <ScrollArea className="flex-1 px-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center pt-20">
                  <ShoppingBag className="w-16 h-16 stroke-[0.5px] text-muted-foreground/30 mb-6" />
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">Your selection is currently empty</p>
                  <Button variant="link" asChild className="mt-6 uppercase text-[10px] tracking-[0.3em] text-gold font-black">
                    <Link href="/shop">Discover Collection</Link>
                  </Button>
                </div>
              ) : (
                <div className="py-8 space-y-10 text-black">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group animate-in slide-in-from-right-4">
                      <div className="w-24 h-32 bg-pearl overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-1">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-[10px] uppercase tracking-widest font-black leading-tight line-clamp-2">{item.name}</h4>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-black transition-colors">
                              <span className="text-[10px] uppercase font-bold tracking-widest">Remove</span>
                            </button>
                          </div>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">{item.category} • {item.gender}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-black/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-xs hover:bg-black/5 font-bold transition-colors"
                            >-</button>
                            <span className="px-3 text-[10px] font-black">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-xs hover:bg-black/5 font-bold transition-colors"
                            >+</button>
                          </div>
                          <p className="text-sm font-black tracking-tight">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {cart.length > 0 && (
              <div className="p-8 border-t border-black/5 space-y-6 bg-pearl/30 text-black">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Estimated Total</span>
                  <span className="text-2xl font-headline font-black">{formatPrice(total)}</span>
                </div>
                <Button className="w-full rounded-none h-16 bg-black text-white hover:bg-gold transition-all duration-700 uppercase text-[10px] tracking-[0.4em] font-black shadow-lg" asChild>
                  <Link href="/checkout">Secure Checkout</Link>
                </Button>
                <p className="text-[8px] text-center text-muted-foreground uppercase tracking-[0.3em] font-bold">Complimentary Express Global Shipping & Artful Packaging</p>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
