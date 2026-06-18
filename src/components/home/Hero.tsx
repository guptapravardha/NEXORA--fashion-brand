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
    
    // Performance optimization for mobile: only parallax on larger screens
    const isMobile = window.innerWidth < 768;
    
    if (videoRef.current && !isMobile) {
      gsap.to(videoRef.current, {
        yPercent: 20,
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
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          ref={videoRef}
          src="https://picsum.photos/seed/nexora-hero/1920/1080" 
          alt="Luxury Fashion" 
          className="w-full h-full md:h-[120%] object-cover brightness-[0.6] md:brightness-[0.7]"
          data-ai-hint="fashion runway"
        />
      </div>
      
      <div ref={contentRef} className="relative z-10 text-center text-white px-6 w-full max-w-4xl">
        <span className="reveal opacity-0 translate-y-8 block text-[10px] md:text-sm uppercase tracking-[0.5em] mb-4 md:mb-6 font-medium">The New Collection</span>
        <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-8xl font-headline font-black uppercase tracking-[0.1em] mb-8 md:mb-10 leading-[1.2] md:leading-[1.1]">
          Echoes of <br/> Eternity
        </h2>
        <div className="reveal opacity-0 translate-y-8 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center max-w-xs sm:max-w-none mx-auto">
          <Button size="lg" className="rounded-none bg-white text-black hover:bg-gold hover:text-white px-8 md:px-10 h-12 md:h-14 uppercase text-[10px] md:text-xs tracking-widest font-bold transition-all duration-500" asChild>
            <Link href="/shop?gender=Her">Shop Women&apos;s</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-black px-8 md:px-10 h-12 md:h-14 uppercase text-[10px] md:text-xs tracking-widest font-bold transition-all duration-500 bg-transparent" asChild>
            <Link href="/shop?gender=Him">Shop Men&apos;s</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4 text-white/60 animate-bounce">
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em]">Explore</span>
        <div className="w-[1px] h-6 md:h-10 bg-white/30"></div>
      </div>
    </section>
  );
}