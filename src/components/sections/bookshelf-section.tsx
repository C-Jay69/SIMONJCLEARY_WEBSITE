'use client';

import { BookOpen, Star, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

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
}

interface BookshelfSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  loading: boolean;
}

export function BookshelfSection({ books, onSelectBook, loading }: BookshelfSectionProps) {
  return (
    <section id="library" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-warm-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-warm-700 text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
            The Collection
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-warm-900 mb-4">
            The Library
          </h2>
          <div className="library-divider max-w-xs mx-auto mb-6">
            <span className="text-gold text-lg">✦</span>
          </div>
          <p className="font-sans text-warm-800 text-lg max-w-2xl mx-auto">
            Every book on these shelves holds a world waiting to be discovered. 
            Click any title to read an exclusive excerpt.
          </p>
        </div>

        {/* Book Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-48 h-72 rounded-lg mb-4" />
                <Skeleton className="h-5 w-36 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => onSelectBook(book)}
              >
                {/* Book Cover */}
                <div className="book-card relative mb-5">
                  <div className="book-spine relative overflow-hidden rounded-lg shadow-xl shadow-warm-900/20">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-48 sm:w-52 h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex items-center gap-2 text-cream bg-leather/90 px-4 py-2 rounded-full text-sm font-sans">
                        <BookOpen className="h-4 w-4" />
                        Read Excerpt
                      </div>
                    </div>
                  </div>
                  {/* Featured badge */}
                  {book.featured && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-gold text-warm-900 rounded-full p-1.5 shadow-lg">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="text-center max-w-[220px]">
                  <h3 className="font-serif text-lg font-semibold text-warm-900 group-hover:text-leather transition-colors mb-1 leading-snug">
                    {book.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs font-sans bg-warm-200 text-warm-800 hover:bg-warm-300 border-0">
                      {book.genre}
                    </Badge>
                    <span className="text-warm-600 text-xs font-sans">{book.publishedDate}</span>
                  </div>
                  <p className="font-sans text-warm-700 text-sm line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Decorative bottom */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 text-warm-300">
            <div className="w-16 h-[1px] bg-warm-300" />
            <BookOpen className="h-4 w-4" />
            <div className="w-16 h-[1px] bg-warm-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
