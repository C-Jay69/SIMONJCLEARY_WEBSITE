'use client';

import { Calendar, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  content?: string;
}

interface BlogDetailDialogProps {
  post: BlogPost | null;
  open: boolean;
  onClose: () => void;
}

export function BlogDetailDialog({ post, open, onClose }: BlogDetailDialogProps) {
  if (!post) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="font-serif text-2xl font-bold text-warm-900 mt-6 mb-3">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="font-serif text-xl font-semibold text-warm-900 mt-5 mb-2">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="font-serif text-lg font-semibold text-warm-800 mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="font-sans text-warm-800 text-sm ml-4 leading-relaxed">{line.slice(2)}</li>;
      }
      if (line.match(/^\d+\. /)) {
        return <li key={i} className="font-sans text-warm-800 text-sm ml-4 leading-relaxed list-decimal">{line.replace(/^\d+\. /, '')}</li>;
      }
      if (line.startsWith('*') && line.endsWith('*') && line.length > 2) {
        return <p key={i} className="font-sans text-warm-700 text-sm italic my-2 leading-relaxed">{line.slice(1, -1)}</p>;
      }
      if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        return <p key={i} className="font-sans text-warm-800 text-sm font-semibold my-2">{line.slice(2, -2)}</p>;
      }
      if (line.trim() === '') {
        return <div key={i} className="h-3" />;
      }
      // Handle inline bold and italic
      const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      return (
        <p key={i} className="font-sans text-warm-800 text-sm leading-relaxed">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-warm-800">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={j}>{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-card border-warm-200">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 to-transparent" />
        </div>

        <DialogHeader className="px-6 pt-4 pb-0">
          <div className="flex items-center gap-2 text-warm-600 text-xs font-sans mb-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(post.publishedAt)}</span>
            <span className="mx-1">·</span>
            <span>{post.author}</span>
          </div>
          <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-warm-900 leading-tight">
            {post.title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 max-h-[45vh]">
          <div className="py-4">
            {post.content ? renderContent(post.content) : (
              <p className="font-sans text-warm-800 text-sm leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 pb-6 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-warm-300 text-warm-800 hover:bg-warm-50 font-sans"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
