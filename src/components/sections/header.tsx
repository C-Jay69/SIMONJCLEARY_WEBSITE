'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onJoinMembership?: () => void;
}

const navLinks = [
  { label: 'Library', href: '#library' },
  { label: 'Blog', href: '#blog' },
  { label: 'Membership', href: '#membership' },
];

export function Header({ onJoinMembership }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-md border-b border-warm-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <BookOpen className={`h-6 w-6 transition-transform group-hover:scale-110 ${
              scrolled ? 'text-gold-dark' : 'text-gold'
            }`} />
            <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? 'text-warm-900' : 'text-white'
            }`}>
              Simon J Cleary
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-sm tracking-wide uppercase transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled
                    ? 'text-warm-800 hover:text-warm-900'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={onJoinMembership}
              className={`font-sans text-sm tracking-wide uppercase px-6 transition-colors ${
                scrolled
                  ? 'bg-leather hover:bg-warm-800 text-cream'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/30'
              }`}
            >
              Join the Library
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-warm-800 hover:text-warm-900' : 'text-white hover:text-white/80'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-warm-200 bg-[#FFF8F0]/98 backdrop-blur-md">
            <nav className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-warm-800 hover:text-warm-900 font-sans text-sm tracking-wide uppercase py-2 px-4 rounded-md hover:bg-warm-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-2">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onJoinMembership?.();
                  }}
                  className="w-full bg-leather hover:bg-warm-800 text-cream font-sans text-sm tracking-wide uppercase"
                >
                  Join the Library
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
