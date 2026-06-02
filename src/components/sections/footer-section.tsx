'use client';

import { BookOpen, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-warm-900 text-warm-200 mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-warm-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="h-8 w-8 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-3">
              Stay in the Story
            </h3>
            <p className="font-sans text-warm-200 mb-6">
              Join the newsletter for exclusive excerpts, writing updates, and early access to new books.
            </p>
            {subscribed ? (
              <div className="bg-warm-800/50 rounded-lg p-4">
                <p className="font-sans text-gold-light text-sm font-semibold">
                  ✦ Welcome to the circle! Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="bg-warm-800 border-warm-700 text-cream placeholder:text-warm-500 font-sans text-sm focus:ring-gold"
                />
                <Button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-gold hover:bg-gold-dark text-warm-900 font-sans text-sm tracking-wide px-6"
                >
                  {loading ? '...' : 'Subscribe'}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-gold" />
              <span className="font-serif text-xl font-bold text-cream">
                Simon J Cleary
              </span>
            </div>
            <p className="font-sans text-warm-200 text-sm leading-relaxed">
              Award-winning author of literary fiction, mystery, and stories that stay with you long after the last page.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Library
            </h4>
            <ul className="space-y-2">
              {['All Books', 'Featured', 'New Releases', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-warm-200 hover:text-gold text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Membership
            </h4>
            <ul className="space-y-2">
              {['Reader Plan', 'Patron Plan', 'Lifetime Access', 'Gift a Membership'].map((item) => (
                <li key={item}>
                  <a href="#membership" className="font-sans text-warm-200 hover:text-gold text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {['About Simon', 'Contact', 'Press Kit', 'Events'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-warm-200 hover:text-gold text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-warm-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-warm-300 text-xs">
            © {new Date().getFullYear()} Simon J Cleary. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-warm-300 hover:text-warm-100 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-warm-300 hover:text-warm-100 text-xs transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
