'use client';

import { useState } from 'react';
import { Lock, Check, ArrowRight, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const tierDetails: Record<string, { name: string; price: string; period: string }> = {
  reader: { name: 'Reader', price: '£4.99', period: '/month' },
  patron: { name: 'Patron', price: '£9.99', period: '/month' },
  lifetime: { name: 'Lifetime', price: '£149', period: ' one-time' },
};

interface MembershipDialogProps {
  open: boolean;
  onClose: () => void;
  defaultTier?: string;
}

export function MembershipDialog({ open, onClose, defaultTier = 'reader' }: MembershipDialogProps) {
  const [selectedTier, setSelectedTier] = useState(defaultTier);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const tier = tierDetails[selectedTier];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, tier: selectedTier }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast({
          title: 'Welcome to the library!',
          description: `You've joined as a ${tier.name} member. Happy reading!`,
        });
      } else {
        toast({
          title: 'Something went wrong',
          description: data.error || 'Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Connection error',
        description: 'Please check your internet and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setName('');
    setEmail('');
    setSelectedTier(defaultTier);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-card border-warm-200">
        {success ? (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-warm-700" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-warm-900 mb-2">
              Welcome to the Library!
            </h3>
            <p className="font-sans text-warm-800 text-sm mb-6">
              You&apos;ve joined as a <strong>{tier?.name}</strong> member. 
              Your library card is on its way to your inbox.
            </p>
            <Button
              onClick={handleClose}
              className="bg-leather hover:bg-warm-800 text-cream font-sans text-sm tracking-wide"
            >
              Start Reading
            </Button>
          </div>
        ) : (
          /* Signup Form */
          <>
            <DialogHeader className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-gold-dark" />
                <DialogTitle className="font-serif text-2xl font-bold text-warm-900">
                  Join the Library
                </DialogTitle>
              </div>
              <DialogDescription className="font-sans text-warm-700 text-sm">
                Choose your membership and start reading every book on the shelf.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-6">
              {/* Tier Selection */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {Object.entries(tierDetails).map(([id, details]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedTier(id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedTier === id
                        ? 'border-gold bg-gold/10'
                        : 'border-warm-200 hover:border-warm-300'
                    }`}
                  >
                    <p className="font-serif text-sm font-semibold text-warm-900">
                      {details.name}
                    </p>
                    <p className="font-sans text-xs text-warm-700">
                      {details.price}{details.period}
                    </p>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="font-sans text-sm text-warm-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans placeholder:text-warm-500 focus:ring-gold"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-sans text-sm text-warm-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans placeholder:text-warm-500 focus:ring-gold"
                  />
                </div>

                <div className="bg-warm-50 rounded-lg p-4 border border-warm-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-sm text-warm-700">Selected Plan</span>
                    <Badge className="bg-gold/20 text-gold-dark border-0 font-sans text-xs">
                      {tier?.name}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-warm-900">
                      {tier?.price}
                    </span>
                    <span className="font-sans text-warm-600 text-sm">{tier?.period}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !name || !email}
                  className="w-full bg-leather hover:bg-warm-800 text-cream font-sans text-sm tracking-wide uppercase py-5"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Complete Membership
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="font-sans text-warm-600 text-xs text-center">
                  Secure payment via Stripe. Cancel anytime.
                </p>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
