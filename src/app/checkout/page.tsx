'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, ChevronRight, CheckCircle2, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, total, clear } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      clear();
    }, 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen pt-40 pb-24 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-700">
          <div className="flex justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-gold stroke-[1px]" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-headline font-black uppercase tracking-widest">Order Confirmed</h2>
            <p className="text-xs text-muted-foreground leading-relaxed uppercase tracking-widest">
              Thank you for your acquisition. A confirmation email and artisanal tracking details have been sent to your registered address.
            </p>
          </div>
          <div className="pt-8 space-y-4">
            <Button asChild className="w-full rounded-none h-14 bg-black hover:bg-gold transition-colors duration-500 uppercase text-xs tracking-widest font-bold shadow-lg">
              <Link href="/shop">Continue Exploring</Link>
            </Button>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Order ID: NX-8842-9912-2024</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-24 flex flex-col items-center justify-center px-6 text-center space-y-8">
        <ShoppingBag className="w-16 h-16 stroke-[0.5px] text-muted-foreground" />
        <h2 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-widest">Your selection is empty</h2>
        <Button asChild className="rounded-none bg-black px-12 h-14 uppercase text-xs tracking-widest">
          <Link href="/shop">Discover Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-16 bg-pearl/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        <div className="lg:col-span-8 space-y-10 md:space-y-12">
          <header className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-headline font-black uppercase tracking-widest">Secure Checkout</h1>
            <div className="flex items-center gap-3 text-[8px] md:text-[10px] uppercase tracking-widest font-bold overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
              <span className={step >= 1 ? 'text-black' : 'text-muted-foreground'}>Information</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className={step >= 2 ? 'text-black' : 'text-muted-foreground'}>Shipping</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className={step >= 3 ? 'text-black' : 'text-muted-foreground'}>Payment</span>
            </div>
          </header>

          <div className="bg-white p-6 md:p-10 border border-black/5 shadow-sm">
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">First Name</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">Last Name</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">Email Address</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">Phone Number</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" placeholder="+91" />
                  </div>
                </div>
                <Button onClick={handleNext} className="rounded-none w-full md:w-auto px-16 h-14 bg-black uppercase text-xs tracking-widest shadow-lg">Continue to Shipping</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">Residential Address</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">City</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">State</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold">PIN Code</label>
                    <Input className="rounded-none border-black/10 h-12 text-sm" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={handleBack} className="rounded-none w-full sm:w-auto px-12 h-14 uppercase text-xs tracking-widest">Back</Button>
                  <Button onClick={handleNext} className="rounded-none w-full sm:flex-1 h-14 bg-black uppercase text-xs tracking-widest shadow-lg">Continue to Payment</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-gold mb-2">
                    <CreditCard className="w-6 h-6" />
                    <h3 className="text-sm uppercase tracking-widest font-black">Secure Gateway Integration</h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                    All transactions are secured with 256-bit encryption. You will be redirected to the production gateway to complete your Indian Rupee (INR) acquisition.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-green-600">Verified Secure Transaction</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={handleBack} className="rounded-none w-full sm:w-auto px-12 h-14 uppercase text-xs tracking-widest" disabled={loading}>Back</Button>
                  <Button 
                    onClick={handlePayment} 
                    disabled={loading}
                    className="rounded-none w-full sm:flex-1 h-14 bg-gold hover:bg-gold-hover text-white uppercase text-xs tracking-widest font-bold shadow-lg"
                  >
                    {loading ? 'Orchestrating Gateway...' : `Authorize Payment (${formatPrice(total)})`}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8 order-first lg:order-last">
          <div className="bg-white p-6 md:p-8 border border-black/5 lg:sticky lg:top-32 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-black mb-6 pb-4 border-b border-black/5">Order Summary</h3>
            <div className="space-y-6 mb-8 max-h-[30vh] md:max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-14 h-18 bg-pearl shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between py-1 overflow-hidden">
                    <h4 className="text-[9px] uppercase tracking-widest font-bold line-clamp-1">{item.name}</h4>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-[10px] font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-black/5">
              <div className="flex justify-between items-center text-[9px] uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-green-600 font-bold">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black">Total (INR)</span>
                <span className="text-xl font-headline font-black">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}