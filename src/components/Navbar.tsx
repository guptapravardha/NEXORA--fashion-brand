
'use client';

import Link from 'next/link';
import { ShoppingBag, X, Menu } from 'lucide-react';
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
      <DropdownMenuTrigger className="hover:text-gold transition-colors outline-none">
        For {gender}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border-black/5 rounded-none min-w-[160px] p-2 mt-2">
        <DropdownMenuItem asChild>
          <Link href={`/shop?gender=${gender}&category=Apparel`} className="text-[10px] uppercase tracking-widest font-bold py-3 cursor-pointer block">Apparel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/shop?gender=${gender}&category=Accessories`} className="text-[10px] uppercase tracking-widest font-bold py-3 cursor-pointer block">Accessories</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/shop?gender=${gender}&category=Footwear`} className="text-[10px] uppercase tracking-widest font-bold py-3 cursor-pointer block">Shoes</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-8 md:px-16 flex items-center justify-between",
      scrolled ? "bg-white/90 backdrop-blur-md py-4 border-b border-black/5" : "bg-transparent text-white"
    )}>
      <div className={cn("flex items-center gap-8", scrolled ? "text-black" : "text-white")}>
        <button className="md:hidden">
          <Menu className="w-5 h-5 stroke-[1px]" />
        </button>
        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
          <ShopDropdown gender="Her" />
          <ShopDropdown gender="Him" />
          <Link href="/shop" className="hover:text-gold transition-colors">The World of Nexora</Link>
        </div>
      </div>

      <Link href="/" className={cn("absolute left-1/2 -translate-x-1/2", scrolled ? "text-black" : "text-white")}>
        <h1 className="text-2xl md:text-3xl font-headline tracking-[0.15em] font-black uppercase">Nexora</h1>
      </Link>

      <div className={cn("flex items-center gap-6", scrolled ? "text-black" : "text-white")}>
        <StylistModal />
        
        <SearchModal scrolled={scrolled} />
        
        <AuthModal scrolled={scrolled} />

        <Sheet>
          <SheetTrigger asChild>
            <button className="relative group">
              <ShoppingBag className="w-5 h-5 stroke-[1px] group-hover:text-gold transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md p-0 flex flex-col border-l-0 shadow-2xl">
            <SheetHeader className="p-8 border-b border-black/5">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-sm uppercase tracking-[0.2em] font-headline font-bold">Your Selection</SheetTitle>
              </div>
            </SheetHeader>
            
            <ScrollArea className="flex-1 px-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center pt-20">
                  <ShoppingBag className="w-12 h-12 stroke-[0.5px] text-muted-foreground mb-4" />
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">Your selection is empty</p>
                  <Button variant="link" asChild className="mt-4 uppercase text-xs tracking-widest text-gold">
                    <Link href="/shop">Discover Collection</Link>
                  </Button>
                </div>
              ) : (
                <div className="py-8 space-y-8 text-black">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="w-24 h-32 bg-pearl overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs uppercase tracking-widest font-bold line-clamp-2">{item.name}</h4>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-black">
                              <X className="w-4 h-4 stroke-[1px]" />
                            </button>
                          </div>
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-black/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-xs hover:bg-black/5"
                            >-</button>
                            <span className="px-2 text-xs font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-xs hover:bg-black/5"
                            >+</button>
                          </div>
                          <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {cart.length > 0 && (
              <div className="p-8 border-t border-black/5 space-y-4 text-black">
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase tracking-widest font-medium">Estimated Total</span>
                  <span className="text-xl font-headline font-bold">{formatPrice(total)}</span>
                </div>
                <Button className="w-full rounded-none h-14 bg-black text-white hover:bg-gold transition-colors duration-500 uppercase text-xs tracking-[0.2em]" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">Complimentary Shipping on all orders</p>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
