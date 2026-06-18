
'use client';

import { useState } from 'react';
import { User, X, Lock, Mail, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AuthModal({ scrolled }: { scrolled: boolean }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group">
          <User className={`w-5 h-5 stroke-[1px] transition-colors ${scrolled ? 'text-black' : 'text-white'} group-hover:text-gold`} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white border-l-0 p-0 flex flex-col shadow-2xl">
        <div className="flex-1 p-12 space-y-12">
          <SheetHeader className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-black">Membership</span>
            <SheetTitle className="text-4xl font-headline font-black uppercase tracking-widest">
              {mode === 'login' ? 'Sign In' : 'Join Nexora'}
            </SheetTitle>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed">
              Experience personalized styling, early access to collections, and complimentary express global shipping.
            </p>
          </SheetHeader>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] font-black">Full Name</label>
                <div className="relative">
                   <Input className="rounded-none border-black/10 h-12 uppercase text-[10px] tracking-widest" placeholder="ALEXANDER VOGUE" />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-black">Email Address</label>
              <div className="relative">
                <Input className="rounded-none border-black/10 h-12 uppercase text-[10px] tracking-widest" placeholder="CLIENT@NEXORA.COM" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-black">Password</label>
              <div className="relative">
                <Input type="password" className="rounded-none border-black/10 h-12 uppercase text-[10px] tracking-widest" placeholder="••••••••" />
              </div>
            </div>
            
            {mode === 'login' && (
              <button className="text-[9px] uppercase tracking-widest font-bold hover:text-gold transition-colors">Forgot Password?</button>
            )}

            <Button className="w-full rounded-none h-14 bg-black hover:bg-gold transition-all duration-500 uppercase text-xs tracking-[0.3em] font-black group">
              {mode === 'login' ? 'Enter The World' : 'Create Account'}
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="pt-8 border-t border-black/5 text-center space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already a member?"}
            </p>
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-xs uppercase tracking-[0.2em] font-black border-b border-black pb-1 hover:text-gold hover:border-gold transition-all"
            >
              {mode === 'login' ? 'Create Membership' : 'Sign In To Account'}
            </button>
          </div>
        </div>

        <div className="p-12 bg-pearl/50 space-y-4">
          <div className="flex items-center gap-4">
            <Lock className="w-4 h-4 stroke-[1px] text-gold" />
            <span className="text-[9px] uppercase tracking-widest font-bold">Secure Encrypted Portal</span>
          </div>
          <p className="text-[8px] uppercase tracking-widest text-muted-foreground leading-relaxed">
            NEXORA ensures the highest level of data protection for our clients. Your information is strictly confidential.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
