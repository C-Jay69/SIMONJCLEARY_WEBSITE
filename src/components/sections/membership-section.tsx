'use client';

import { Check, Crown, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MembershipSectionProps {
  onJoinMembership: (tier: string) => void;
}

const tiers = [
  {
    id: 'reader',
    name: 'Reader',
    price: '4.99',
    period: '/month',
    description: 'For curious minds who want to read the full stories.',
    icon: BookOpen,
    features: [
      'Full access to all books',
      'Early access to new releases',
      'Monthly author newsletter',
      'Community reading group',
    ],
    highlight: false,
    badge: null,
  },
  {
    id: 'patron',
    name: 'Patron',
    price: '9.99',
    period: '/month',
    description: 'For devoted readers who want to support the craft.',
    icon: Crown,
    features: [
      'Everything in Reader',
      'Behind-the-scenes writing notes',
      'Dedication in upcoming books',
      'Exclusive short stories',
      'Quarterly live Q&A sessions',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '149',
    period: ' one-time',
    description: 'For lifelong lovers of the written word.',
    icon: Heart,
    features: [
      'Everything in Patron',
      'Lifetime access — never pay again',
      'Signed first editions (where available)',
      'Personal thank-you letter from Simon',
      'Priority input on future projects',
    ],
    highlight: false,
    badge: null,
  },
];

export function MembershipSection({ onJoinMembership }: MembershipSectionProps) {
  return (
    <section id="membership" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-warm-50 to-parchment">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-warm-700 text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
            Join the Circle
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-warm-900 mb-4">
            Membership
          </h2>
          <div className="library-divider max-w-xs mx-auto mb-6">
            <span className="text-gold text-lg">✦</span>
          </div>
          <p className="font-sans text-warm-800 text-lg max-w-2xl mx-auto">
            Snippets are free, but the full stories are reserved for members. 
            Choose a plan that suits your reading appetite and join the inner circle.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  tier.highlight
                    ? 'border-2 border-gold bg-card shadow-lg shadow-gold/10'
                    : 'border-warm-200 bg-card'
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gold text-warm-900 font-sans text-xs border-0">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-2 pt-8 px-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    tier.highlight ? 'bg-gold/20' : 'bg-warm-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      tier.highlight ? 'text-gold-dark' : 'text-warm-700'
                    }`} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-warm-900">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-serif text-4xl font-bold text-warm-900">
                      £{tier.price}
                    </span>
                    <span className="font-sans text-warm-600 text-sm">
                      {tier.period}
                    </span>
                  </div>
                  <p className="font-sans text-warm-700 text-sm mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          tier.highlight ? 'text-gold-dark' : 'text-warm-600'
                        }`} />
                        <span className="font-sans text-warm-800 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onJoinMembership(tier.id)}
                    className={`w-full font-sans text-sm tracking-wide uppercase py-5 ${
                      tier.highlight
                        ? 'bg-leather hover:bg-warm-800 text-cream shadow-md'
                        : 'bg-warm-100 hover:bg-warm-200 text-warm-800 border border-warm-200'
                    }`}
                  >
                    Choose {tier.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust note */}
        <p className="text-center font-sans text-warm-600 text-sm mt-10 max-w-lg mx-auto">
          Secure payment via Stripe. Cancel anytime. Your membership unlocks 
          every book in the library — no hidden fees, no surprises.
        </p>
      </div>
    </section>
  );
}
