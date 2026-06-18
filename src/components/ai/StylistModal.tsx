
'use client';

import { useState } from 'react';
import { Sparkles, X, Loader2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { nexoraStylistAIRecommendations, NEXORAStylistAIRecommendationsOutput } from '@/ai/flows/nexora-stylist-ai-recommendations';
import { formatPrice, products } from '@/lib/data';
import { useCart } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

export function StylistModal() {
  const [occasion, setOccasion] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<NEXORAStylistAIRecommendationsOutput | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleGetRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!occasion.trim()) return;

    setLoading(true);
    try {
      const result = await nexoraStylistAIRecommendations({ occasion });
      setRecommendation(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Stylist Unavailable",
        description: "Our AI stylist is currently attending to other clients. Please try again shortly.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const findProduct = (itemName: string) => {
    // Simple fuzzy match for demo
    return products.find(p => p.name.toLowerCase().includes(itemName.toLowerCase().split(' ')[0])) || products[0];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 stroke-[1px] group-hover:text-gold transition-colors" />
          <span className="hidden lg:block text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-gold transition-colors">AI Stylist</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white border-none rounded-none shadow-2xl p-0 overflow-hidden">
        <div className="flex flex-col h-[85vh]">
          <DialogHeader className="p-8 border-b border-black/5 shrink-0 bg-pearl">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <DialogTitle className="text-sm uppercase tracking-[0.3em] font-headline font-black">NEXORA Stylist AI</DialogTitle>
            </div>
            <DialogDescription className="text-xs uppercase tracking-widest text-muted-foreground">
              Your personal curator for the world&apos;s most exclusive occasions.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {!recommendation && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-pearl flex items-center justify-center">
                  <Search className="w-8 h-8 stroke-[1px] text-muted-foreground" />
                </div>
                <div className="space-y-4 max-w-md">
                  <h3 className="text-lg font-headline font-bold uppercase tracking-widest">What is the occasion?</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest leading-relaxed">
                    Whether it&apos;s a Parisian gala, a private yacht brunch, or a critical boardroom assembly, let our AI orchestrate your perfect ensemble.
                  </p>
                </div>
                <form onSubmit={handleGetRecommendations} className="w-full max-w-sm flex flex-col gap-4">
                  <Input 
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. Evening Gala in Milan"
                    className="rounded-none border-black/10 focus:border-gold h-12 uppercase text-[10px] tracking-widest"
                  />
                  <Button 
                    type="submit"
                    disabled={!occasion.trim()}
                    className="rounded-none h-12 bg-black hover:bg-gold transition-colors duration-500 uppercase text-[10px] tracking-widest"
                  >
                    Curate My Look
                  </Button>
                </form>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <Loader2 className="w-10 h-10 animate-spin text-gold stroke-[1px]" />
                <p className="text-xs uppercase tracking-[0.3em] font-medium text-muted-foreground">Analyzing Seasonal Collections...</p>
              </div>
            )}

            {recommendation && !loading && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-pearl p-6 space-y-3">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Stylist&apos;s Perspective</h4>
                  <p className="text-xs leading-relaxed italic text-muted-foreground">{recommendation.overallRationale}</p>
                </div>

                <div className="space-y-8">
                  {recommendation.outfit.map((item, idx) => {
                    const product = findProduct(item.item);
                    return (
                      <div key={idx} className="flex gap-6 group">
                        <div className="w-32 h-44 bg-pearl overflow-hidden shrink-0">
                          <img 
                            src={product.imageUrl} 
                            alt={item.item} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        </div>
                        <div className="space-y-3 py-2">
                          <div className="flex justify-between items-start">
                            <h5 className="text-[11px] uppercase tracking-[0.2em] font-bold">{item.item}</h5>
                            <span className="text-[10px] font-medium">{formatPrice(product.price)}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                            {item.description}
                          </p>
                          <div className="pt-2">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-gold mb-2">Rationale:</p>
                            <p className="text-[9px] text-black/60 leading-relaxed italic">&quot;{item.rationale}&quot;</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              addItem(product);
                              toast({ title: "Added to Selection", description: `${product.name} has been added.` });
                            }}
                            className="rounded-none h-8 text-[9px] uppercase tracking-widest border-black/10 hover:border-gold hover:text-gold"
                          >
                            Add to Selection
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center pt-8 border-t border-black/5">
                  <Button 
                    variant="link" 
                    onClick={() => setRecommendation(null)}
                    className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-black"
                  >
                    Start New Curation
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
