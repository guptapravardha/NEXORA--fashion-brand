'use client';

import { useState } from 'react';
import { User, X, Lock, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function AuthModal({ scrolled }: { scrolled: boolean }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth for MVP
    setTimeout(() => {
      setLoading(false);
      toast({
        title: mode === 'login' ? "Welcome Back" : "Membership Created",
        description: `Successfully ${mode === 'login' ? 'authenticated' : 'joined'} as ${email || 'Client'}.`,
      });
      // In a real app, this would use the Firebase SDK
    }, 1500);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group p-1">
          <User className={`w-5 h-5 stroke-[1px] transition-colors ${scrolled ? 'text-black' : 'text-white'} group-hover:text-gold`} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white border-l-0 p-0 flex flex-col shadow-2xl">
        <div className="flex-1 p-12 space-y-12">
          <SheetHeader className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-black">NEXORA Membership</span>
            <SheetTitle className="text-4xl md:text-5xl font-headline font-black uppercase tracking-widest leading-tight">
              {mode === 'login' ? 'Sign In' : 'Join The World'}
            </SheetTitle>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold leading-relaxed">
              Unlock a realm of artisanal storytelling, early collection access, and complimentary global express logistics.
            </p>
          </SheetHeader>

          <form className="space-y-8" onSubmit={handleAuth}>
            {mode === 'register' && (
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-[0.4em] font-black text-black/40">Full Name</label>
                <Input 
                  required
                  className="rounded-none border-0 border-b border-black/10 h-12 uppercase text-[10px] tracking-widest focus-visible:border-gold transition-colors px-0 shadow-none" 
                  placeholder="E.G. ALEXANDER VOGUE" 
                />
              </div>
            )}
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-black/40">Email Address</label>
              <Input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none border-0 border-b border-black/10 h-12 uppercase text-[10px] tracking-widest focus-visible:border-gold transition-colors px-0 shadow-none" 
                placeholder="CLIENT@NEXORA.COM" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-black/40">Password</label>
              <Input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none border-0 border-b border-black/10 h-12 uppercase text-[10px] tracking-widest focus-visible:border-gold transition-colors px-0 shadow-none" 
                placeholder="••••••••" 
              />
            </div>
            
            {mode === 'login' && (
              <button type="button" className="text-[9px] uppercase tracking-[0.2em] font-black hover:text-gold transition-colors">Recover Password</button>
            )}

            <Button 
              disabled={loading}
              className="w-full rounded-none h-16 bg-black hover:bg-gold transition-all duration-700 uppercase text-[10px] tracking-[0.4em] font-black group shadow-xl"
            >
              {loading ? 'Authenticating...' : (mode === 'login' ? 'Enter The World' : 'Initiate Membership')}
              <ChevronRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </form>

          <div className="pt-10 border-t border-black/5 text-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
              {mode === 'login' ? "Not yet a member?" : "Already hold a membership?"}
            </p>
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-[11px] uppercase tracking-[0.3em] font-black border-b border-black pb-2 hover:text-gold hover:border-gold transition-all"
            >
              {mode === 'login' ? 'Create New Membership' : 'Sign In To Account'}
            </button>
          </div>
        </div>

        <div className="p-12 bg-pearl/40 space-y-6">
          <div className="flex items-center gap-4 text-gold">
            <Lock className="w-5 h-5 stroke-[1px]" />
            <span className="text-[9px] uppercase tracking-[0.3em] font-black">Encrypted Luxury Portal</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground leading-relaxed font-bold">
            NEXORA guarantees absolute privacy. Your data is protected by industry-leading 256-bit encryption and artisanal digital security.
          </p>
          <div className="flex gap-4 pt-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-[8px] uppercase tracking-widest font-black text-green-600">GDPR Compliant • Secure Checkout</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
