'use client';

import { ChevronDown, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-library.png')" }}
      />
      {/* Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-900/70 via-warm-900/50 to-warm-900/80" />
      {/* Amber Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Decorative element */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-gold/60" />
            <BookOpen className="h-5 w-5 text-gold candle-flicker" />
            <div className="w-12 h-[1px] bg-gold/60" />
          </div>
        </div>

        <p className="font-sans text-gold text-sm sm:text-base tracking-[0.3em] uppercase mb-4 font-semibold">
          Welcome to the private library of
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-tight">
          Simon J Cleary
        </h1>

        <div className="library-divider max-w-md mx-auto mb-8">
          <span className="text-gold text-2xl">✦</span>
        </div>

        <p className="font-sans text-white text-lg sm:text-xl md:text-2xl mb-10 leading-relaxed max-w-2xl mx-auto">
          Step inside and browse award-winning fiction.<br className="hidden sm:block" />
          Read a chapter. Stay for the whole story.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-leather hover:bg-warm-800 text-cream font-sans text-base tracking-wide px-8 py-6 shadow-lg shadow-warm-900/30"
          >
            <a href="#library">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse the Library
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/70 text-gold hover:bg-gold/10 font-sans text-base tracking-wide px-8 py-6 font-semibold"
          >
            <a href="#membership">
              Become a Member
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#library" className="text-gold hover:text-gold-light transition-colors">
          <ChevronDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
