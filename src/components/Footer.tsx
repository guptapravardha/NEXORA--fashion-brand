
import Link from 'next/link';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-8 md:px-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-3xl font-headline tracking-widest font-black uppercase mb-8">Nexora</h2>
          <p className="text-xs text-white/50 leading-relaxed uppercase tracking-widest mb-8">
            The pinnacle of modern luxury. Defined by heritage, driven by innovation, and curated for the few who appreciate the extraordinary.
          </p>
          <div className="flex gap-6">
            <Instagram className="w-5 h-5 stroke-[1px] cursor-pointer hover:text-gold transition-colors" />
            <Twitter className="w-5 h-5 stroke-[1px] cursor-pointer hover:text-gold transition-colors" />
            <Facebook className="w-5 h-5 stroke-[1px] cursor-pointer hover:text-gold transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Corporate</h4>
          <ul className="space-y-4 text-[11px] text-white/60 uppercase tracking-widest">
            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Responsibility</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Store Locator</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Client Services</h4>
          <ul className="space-y-4 text-[11px] text-white/60 uppercase tracking-widest">
            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Sizing Guide</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Newsletter</h4>
          <p className="text-[11px] text-white/60 uppercase tracking-widest mb-6">Receive updates on new collections and exclusive events.</p>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent border-b border-white/20 py-2 text-[10px] uppercase tracking-widest outline-none focus:border-gold transition-colors"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 group-hover:text-gold transition-colors">
              <ArrowRight className="w-4 h-4 stroke-[1px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] text-white/40 uppercase tracking-widest">© 2024 NEXORA LUXURY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 text-[9px] text-white/40 uppercase tracking-widest">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
