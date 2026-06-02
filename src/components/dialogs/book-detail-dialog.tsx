'use client';

import { BookOpen, Lock, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  snippet: string;
  coverImage: string;
  genre: string;
  publishedDate: string;
  featured: boolean;
  hasFullContent?: boolean;
}

interface BookDetailDialogProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
  onJoinMembership: () => void;
}

export function BookDetailDialog({ book, open, onClose, onJoinMembership }: BookDetailDialogProps) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-card border-warm-200">
        <div className="flex flex-col md:flex-row h-full">
          {/* Book Cover Side */}
          <div className="relative md:w-2/5 bg-warm-50 p-6 md:p-8 flex flex-col items-center justify-center">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-40 sm:w-48 md:w-56 rounded-lg shadow-2xl shadow-warm-900/30"
              />
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-warm-200/50 rounded-full blur-xl" />
            </div>
            <div className="mt-6 text-center">
              <Badge className="bg-warm-100 text-warm-700 font-sans text-xs border-0">
                {book.genre}
              </Badge>
              <p className="font-sans text-warm-700 text-xs mt-2">
                Published {book.publishedDate}
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="md:w-3/5 flex flex-col">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-warm-900 leading-tight">
                {book.title}
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6">
              <p className="font-sans text-warm-800 text-sm leading-relaxed mb-6">
                {book.description}
              </p>

              <Separator className="my-4 bg-warm-200" />

              {/* Snippet Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-gold-dark" />
                  <h4 className="font-serif text-lg font-semibold text-warm-900">
                    Free Excerpt
                  </h4>
                </div>
                <div className="bg-warm-50 rounded-lg p-5 border border-warm-100">
                  <div className="font-sans text-warm-800 text-sm leading-[1.8] whitespace-pre-line">
                    {book.snippet}
                  </div>
                </div>
              </div>

              {/* Membership Gate */}
              {book.hasFullContent && (
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-leather/5 via-gold/10 to-leather/5 rounded-lg p-6 border border-gold/20 text-center">
                    <Lock className="h-8 w-8 text-gold-dark mx-auto mb-3" />
                    <h4 className="font-serif text-lg font-semibold text-warm-900 mb-2">
                      Continue Reading
                    </h4>
                    <p className="font-sans text-warm-800 text-sm mb-4">
                      The full story is available exclusively to members. Join the library 
                      to unlock every book on the shelf.
                    </p>
                    <Button
                      onClick={onJoinMembership}
                      className="bg-leather hover:bg-warm-800 text-cream font-sans text-sm tracking-wide px-6"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Become a Member to Read More
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>

            <div className="px-6 pb-6 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-warm-300 text-warm-800 hover:bg-warm-50 font-sans"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
