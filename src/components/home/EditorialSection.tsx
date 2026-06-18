'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/button';
import Link from 'next/link';

export function EditorialSection({ 
  title, 
  subtitle, 
  image, 
  flipped = false,
  hint = "" 
}: { 
  title: string; 
  subtitle: string; 
  image: string; 
  flipped?: boolean;
  hint?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    if (!isMobile) {
      tl.fromTo(imageRef.current, 
        { scale: 1.1, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      ).fromTo(textRef.current?.querySelectorAll('.reveal-text'), 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" },
        "-=1"
      );
    } else {
      // Simplified animation for mobile
      tl.fromTo(sectionRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-48 px-6 md:px-16 bg-white overflow-hidden">
      <div className={`flex flex-col ${flipped ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-32 max-w-7xl mx-auto`}>
        <div ref={imageRef} className="w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-pearl group relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            data-ai-hint={hint}
          />
        </div>
        <div ref={textRef} className="w-full md:w-1/2 space-y-6 md:space-y-10">
          <span className="reveal-text block text-[9px] md:text-xs uppercase tracking-[0.5em] text-gold font-bold">{subtitle}</span>
          <h2 className="reveal-text text-3xl md:text-6xl font-headline font-black uppercase tracking-wider leading-tight">
            {title}
          </h2>
          <p className="reveal-text text-sm md:text-base text-muted-foreground leading-relaxed font-body max-w-md">
            The intersection of artisanal tradition and visionary design. Each piece is a testament to the pursuit of perfection, crafted with unparalleled attention to detail.
          </p>
          <div className="reveal-text pt-2 md:pt-4">
            <Button variant="link" className="p-0 h-auto text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold group" asChild>
              <Link href="/shop" className="flex items-center gap-4">
                View Collection
                <div className="w-8 md:w-12 h-[1px] bg-black group-hover:w-16 md:group-hover:w-20 group-hover:bg-gold transition-all duration-500"></div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}