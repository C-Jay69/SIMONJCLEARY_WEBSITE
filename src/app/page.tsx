'use client';

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Header } from '@/components/sections/header';
import { HeroSection } from '@/components/sections/hero-section';
import { BookshelfSection } from '@/components/sections/bookshelf-section';
import { BlogSection } from '@/components/sections/blog-section';
import { MembershipSection } from '@/components/sections/membership-section';
import { FooterSection } from '@/components/sections/footer-section';
import { BookDetailDialog } from '@/components/dialogs/book-detail-dialog';
import { BlogDetailDialog } from '@/components/dialogs/blog-detail-dialog';
import { MembershipDialog } from '@/components/dialogs/membership-dialog';
import { AdminPanel } from '@/components/dialogs/admin-panel';

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

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [showMembership, setShowMembership] = useState(false);
  const [membershipTier, setMembershipTier] = useState<string>('reader');
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [booksRes, blogRes] = await Promise.all([
        fetch('/api/books'),
        fetch('/api/blog'),
      ]);
      const booksData = await booksRes.json();
      const blogData = await blogRes.json();
      setBooks(booksData);
      setBlogPosts(blogData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleSelectBlogPost = async (post: BlogPost) => {
    setSelectedBlogPost(post);
    try {
      const res = await fetch(`/api/blog/${post.id}`);
      const data = await res.json();
      setSelectedBlogPost({ ...post, content: data.content });
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  };

  const handleJoinMembership = (tier: string) => {
    setMembershipTier(tier);
    setShowMembership(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background parchment-bg">
      <Header onJoinMembership={() => handleJoinMembership('reader')} />
      <main className="flex-1">
        <HeroSection />
        <BookshelfSection
          books={books}
          onSelectBook={handleSelectBook}
          loading={loading}
        />
        <BlogSection
          posts={blogPosts}
          onSelectPost={handleSelectBlogPost}
          loading={loading}
        />
        <MembershipSection onJoinMembership={handleJoinMembership} />
      </main>
      <FooterSection />

      {/* Admin Button - subtle floating button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-warm-800/80 hover:bg-warm-900 text-warm-300 hover:text-gold shadow-lg backdrop-blur-sm transition-all duration-200 flex items-center justify-center group"
        title="Admin Panel"
      >
        <Settings className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
      </button>

      {/* Dialogs */}
      <BookDetailDialog
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onJoinMembership={() => {
          setSelectedBook(null);
          setShowMembership(true);
        }}
      />
      <BlogDetailDialog
        post={selectedBlogPost}
        open={!!selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
      />
      <MembershipDialog
        open={showMembership}
        onClose={() => setShowMembership(false)}
        defaultTier={membershipTier}
      />
      <AdminPanel
        open={showAdmin}
        onClose={() => setShowAdmin(false)}
        onBooksChanged={fetchData}
      />
    </div>
  );
}
