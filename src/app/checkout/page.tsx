
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
    // Mocking Razorpay production bridge
    // In a real app, this would call a server action to create an order
    // then use the Razorpay SDK window.Razorpay
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      clear();
    }, 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen pt-40 pb-24 flex items-center justify-center px-8">
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-700">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-gold stroke-[1px]" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-black uppercase tracking-widest">Order Confirmed</h2>
            <p className="text-sm text-muted-foreground leading-relaxed uppercase tracking-widest">
              Thank you for your acquisition. A confirmation email and artisanal tracking details have been sent to your registered address.
            </p>
          </div>
          <div className="pt-8 space-y-4">
            <Button asChild className="w-full rounded-none h-14 bg-black hover:bg-gold transition-colors duration-500 uppercase text-xs tracking-widest font-bold">
              <Link href="/shop">Continue Exploring</Link>
            </Button>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Order ID: NX-8842-9912-2024</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-24 flex flex-col items-center justify-center px-8 text-center space-y-8">
        <ShoppingBag className="w-16 h-16 stroke-[0.5px] text-muted-foreground" />
        <h2 className="text-2xl font-headline font-bold uppercase tracking-widest">Your selection is empty</h2>
        <Button asChild className="rounded-none bg-black px-12 h-14 uppercase text-xs tracking-widest">
          <Link href="/shop">Discover Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-8 md:px-16 bg-pearl/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <header className="space-y-4 mb-12">
            <h1 className="text-4xl font-headline font-black uppercase tracking-widest">Secure Checkout</h1>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
              <span className={step >= 1 ? 'text-black' : 'text-muted-foreground'}>Information</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className={step >= 2 ? 'text-black' : 'text-muted-foreground'}>Shipping</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className={step >= 3 ? 'text-black' : 'text-muted-foreground'}>Payment</span>
            </div>
          </header>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">First Name</label>
                  <Input className="rounded-none border-black/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Last Name</label>
                  <Input className="rounded-none border-black/10 h-12" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                  <Input className="rounded-none border-black/10 h-12" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Phone (INR Communications)</label>
                  <Input className="rounded-none border-black/10 h-12" placeholder="+91" />
                </div>
              </div>
              <Button onClick={handleNext} className="rounded-none w-full md:w-auto px-16 h-14 bg-black uppercase text-xs tracking-widest">Continue to Shipping</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Residential Address</label>
                  <Input className="rounded-none border-black/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">City</label>
                  <Input className="rounded-none border-black/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">State</label>
                  <Input className="rounded-none border-black/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">PIN Code</label>
                  <Input className="rounded-none border-black/10 h-12" />
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="rounded-none px-12 h-14 uppercase text-xs tracking-widest">Back</Button>
                <Button onClick={handleNext} className="rounded-none px-16 h-14 bg-black flex-1 md:flex-none uppercase text-xs tracking-widest">Continue to Payment</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-white p-8 border border-black/5 space-y-6">
                <div className="flex items-center gap-4 text-gold mb-4">
                  <CreditCard className="w-6 h-6" />
                  <h3 className="text-sm uppercase tracking-widest font-black">Razorpay Secure Integration</h3>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest leading-relaxed">
                  All transactions are secured with 256-bit encryption. You will be redirected to Razorpay&apos;s production gateway to complete your Indian Rupee (INR) acquisition.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-green-600">Verified Secure Transaction</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="rounded-none px-12 h-14 uppercase text-xs tracking-widest" disabled={loading}>Back</Button>
                <Button 
                  onClick={handlePayment} 
                  disabled={loading}
                  className="rounded-none px-16 h-14 bg-gold hover:bg-gold-hover text-white flex-1 md:flex-none uppercase text-xs tracking-widest font-bold"
                >
                  {loading ? 'Orchestrating Gateway...' : `Authorize Payment (${formatPrice(total)})`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 border border-black/5 sticky top-32">
            <h3 className="text-xs uppercase tracking-[0.3em] font-black mb-8 pb-4 border-b border-black/5">Order Summary</h3>
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-pearl shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between py-1 overflow-hidden">
                    <h4 className="text-[9px] uppercase tracking-widest font-bold line-clamp-1">{item.name}</h4>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-[10px] font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-black/5">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-green-600 font-bold">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                <span>Taxes</span>
                <span>Inclusive (GST)</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-xs uppercase tracking-[0.2em] font-black">Total (INR)</span>
                <span className="text-2xl font-headline font-black">{formatPrice(total)}</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-black/5 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Truck className="w-4 h-4 stroke-[1px]" />
                <span className="text-[9px] uppercase tracking-widest">Global Express (3-5 Days)</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <ShoppingBag className="w-4 h-4 stroke-[1px]" />
                <span className="text-[9px] uppercase tracking-widest">Artisanal Packaging Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
