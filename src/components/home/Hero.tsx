'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const isMobile = window.innerWidth < 768;
    
    if (videoRef.current && !isMobile) {
      gsap.to(videoRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll('.reveal');
      gsap.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          ref={videoRef}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Fashion Campaign" 
          className="w-full h-full md:h-[115%] object-cover brightness-[0.55] md:brightness-[0.7]"
          data-ai-hint="fashion runway editorial"
        />
      </div>
      
      <div ref={contentRef} className="relative z-10 text-center text-white px-6 w-full max-w-5xl mx-auto">
        <span className="reveal opacity-0 translate-y-6 block text-[9px] md:text-sm uppercase tracking-[0.5em] mb-4 font-black">Collection 2024</span>
        <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-8xl font-headline font-black uppercase tracking-[0.05em] mb-10 md:mb-12 leading-[1.1]">
          Echoes of <br /> Eternity
        </h2>
        <div className="reveal opacity-0 translate-y-10 flex flex-col sm:flex-row gap-4 justify-center max-w-[280px] sm:max-w-none mx-auto">
          <Button size="lg" className="rounded-none bg-white text-black hover:bg-gold hover:text-white px-8 md:px-12 h-12 md:h-16 uppercase text-[10px] md:text-xs tracking-[0.3em] font-black transition-all duration-700" asChild>
            <Link href="/shop?gender=Her">Explore For Her</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-black px-8 md:px-12 h-12 md:h-16 uppercase text-[10px] md:text-xs tracking-[0.3em] font-black transition-all duration-700 bg-transparent" asChild>
            <Link href="/shop?gender=Him">Explore For Him</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3 text-white/50 animate-bounce">
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black">Scroll</span>
        <div className="w-[1px] h-6 md:h-10 bg-white/30"></div>
      </div>
    </section>
  );
}
