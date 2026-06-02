'use client';

import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  loading: boolean;
}

export function BlogSection({ posts, onSelectPost, loading }: BlogSectionProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-warm-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-warm-700 text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
            From the Writing Desk
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-warm-900 mb-4">
            The Blog
          </h2>
          <div className="library-divider max-w-xs mx-auto mb-6">
            <span className="text-gold text-lg">✦</span>
          </div>
          <p className="font-sans text-warm-800 text-lg max-w-2xl mx-auto">
            Musings on storytelling, the writing life, and the books that shaped me. 
            Pour yourself a cup of tea and stay a while.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-warm-200 bg-card">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-warm-200 bg-card hover:shadow-xl hover:shadow-warm-200/50 transition-all duration-300 cursor-pointer group"
                onClick={() => onSelectPost(post)}
              >
                {/* Cover Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-900/40 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-warm-600 text-xs font-sans mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-warm-900 group-hover:text-leather transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-sans text-warm-700 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-gold-dark text-sm font-sans font-medium group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
