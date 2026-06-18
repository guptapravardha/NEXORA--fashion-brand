'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, Sparkles, Search, User, X, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/store';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from './ui/sheet';
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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 py-4 md:py-6 px-4 md:px-16 flex items-center justify-between",
      scrolled ? "bg-white/95 backdrop-blur-md py-3 md:py-4 border-b border-black/5 shadow-sm" : "bg-transparent text-white"
    )}>
      <div className={cn("flex items-center gap-4 md:gap-10", scrolled ? "text-black" : "text-white")}>
        <div className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-black">
          <ShopDropdown gender="Her" />
          <ShopDropdown gender="Him" />
          <Link href="/shop" className="hover:text-gold transition-all duration-300 relative group">
            The World of Nexora
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-1">
              <Menu className="w-5 h-5 stroke-[1px]" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] p-0 border-r-0">
            <div className="flex flex-col h-full bg-white text-black">
              <div className="p-8 border-b border-black/5">
                <h2 className="text-xl font-headline font-black uppercase tracking-widest">Nexora</h2>
              </div>
              <ScrollArea className="flex-1 px-8 py-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Collection</h3>
                    <div className="grid gap-4">
                      <SheetClose asChild><Link href="/shop?gender=Her" className="text-sm font-bold uppercase tracking-widest flex items-center justify-between">For Her <ChevronRight className="w-4 h-4" /></Link></SheetClose>
                      <SheetClose asChild><Link href="/shop?gender=Him" className="text-sm font-bold uppercase tracking-widest flex items-center justify-between">For Him <ChevronRight className="w-4 h-4" /></Link></SheetClose>
                      <SheetClose asChild><Link href="/shop" className="text-sm font-bold uppercase tracking-widest flex items-center justify-between">The World of Nexora <ChevronRight className="w-4 h-4" /></Link></SheetClose>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8 border-t border-black/5">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Services</h3>
                    <div className="grid gap-4">
                      <SheetClose asChild><Link href="#" className="text-sm font-bold uppercase tracking-widest">Heritage</Link></SheetClose>
                      <SheetClose asChild><Link href="#" className="text-sm font-bold uppercase tracking-widest">Atelier</Link></SheetClose>
                      <SheetClose asChild><Link href="#" className="text-sm font-bold uppercase tracking-widest">Contact</Link></SheetClose>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-8 bg-pearl/30">
                <div className="flex gap-6 mb-8">
                  <StylistModal />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">© 2024 NEXORA LUXURY</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Link href="/" className={cn("absolute left-1/2 -translate-x-1/2 transition-transform duration-500 hover:scale-105", scrolled ? "text-black" : "text-white")}>
        <h1 className="text-xl md:text-4xl font-headline tracking-[0.2em] font-black uppercase">Nexora</h1>
      </Link>

      <div className={cn("flex items-center gap-3 md:gap-8", scrolled ? "text-black" : "text-white")}>
        <div className="hidden sm:block">
          <StylistModal />
        </div>
        
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
            <SheetHeader className="p-6 md:p-8 border-b border-black/5 bg-pearl/30">
              <SheetTitle className="text-sm uppercase tracking-[0.3em] font-headline font-black">Your Selection</SheetTitle>
            </SheetHeader>
            
            <ScrollArea className="flex-1 px-6 md:px-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center pt-20 pb-10">
                  <ShoppingBag className="w-16 h-16 stroke-[0.5px] text-muted-foreground/30 mb-6" />
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">Your selection is currently empty</p>
                  <Button variant="link" asChild className="mt-6 uppercase text-[10px] tracking-[0.3em] text-gold font-black">
                    <Link href="/shop">Discover Collection</Link>
                  </Button>
                </div>
              ) : (
                <div className="py-8 space-y-10 text-black">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 md:gap-6 group animate-in slide-in-from-right-4">
                      <div className="w-20 h-28 md:w-24 md:h-32 bg-pearl overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-1">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-[10px] uppercase tracking-widest font-black leading-tight line-clamp-2">{item.name}</h4>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-black transition-colors shrink-0 ml-2">
                              <span className="text-[9px] uppercase font-bold tracking-widest">Remove</span>
                            </button>
                          </div>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">{item.category} • {item.gender}</p>
                        </div>
                        <div className="flex justify-between items-end gap-2">
                          <div className="flex items-center border border-black/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 md:px-3 py-1 text-xs hover:bg-black/5 font-bold transition-colors"
                            >-</button>
                            <span className="px-2 md:px-3 text-[10px] font-black">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 md:px-3 py-1 text-xs hover:bg-black/5 font-bold transition-colors"
                            >+</button>
                          </div>
                          <p className="text-xs md:text-sm font-black tracking-tight whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {cart.length > 0 && (
              <div className="p-6 md:p-8 border-t border-black/5 space-y-4 md:space-y-6 bg-pearl/30 text-black">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Estimated Total</span>
                  <span className="text-xl md:text-2xl font-headline font-black">{formatPrice(total)}</span>
                </div>
                <SheetClose asChild>
                  <Button className="w-full rounded-none h-14 md:h-16 bg-black text-white hover:bg-gold transition-all duration-700 uppercase text-[10px] tracking-[0.4em] font-black shadow-lg" asChild>
                    <Link href="/checkout">Secure Checkout</Link>
                  </Button>
                </SheetClose>
                <p className="text-[8px] text-center text-muted-foreground uppercase tracking-[0.3em] font-bold">Complimentary Express Global Shipping</p>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}