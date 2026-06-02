'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  BookOpen,
  Upload,
  Plus,
  Trash2,
  Save,
  X,
  FileText,
  Loader2,
  AlertTriangle,
  Check,
  Lock,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  snippet: string;
  fullContent: string;
  coverImage: string;
  genre: string;
  publishedDate: string;
  featured: boolean;
  order: number;
}

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  onBooksChanged: () => void;
}

const emptyBook = {
  title: '',
  slug: '',
  description: '',
  snippet: '',
  fullContent: '',
  coverImage: '/images/books/book_placeholder.png',
  genre: 'Fiction',
  publishedDate: new Date().getFullYear().toString(),
  featured: false,
  order: 0,
};

const AUTH_KEY = 'sjc_admin_token';

export function AdminPanel({ open, onClose, onBooksChanged }: AdminPanelProps) {
  // Auth state
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Data state
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ wordCount: number; filename: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Check for existing token on mount or open
  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        verifyToken(stored);
      }
    }
  }, [open]);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        setAuthToken(token);
        fetchBooks(token);
      } else {
        localStorage.removeItem(AUTH_KEY);
        setAuthToken(null);
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
      setAuthToken(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setAuthToken(data.token);
        localStorage.setItem(AUTH_KEY, data.token);
        setPassword('');
        fetchBooks(data.token);
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch {
      setLoginError('Connection error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem(AUTH_KEY);
    setBooks([]);
    setEditingBook(null);
    setPassword('');
  };

  const handleClose = () => {
    // Don't clear auth on close — stay logged in during session
    onClose();
  };

  // Helper for authenticated fetch
  const authFetch = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
  };

  const fetchBooks = async (token?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/books', {
        headers: { Authorization: `Bearer ${token || authToken}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBook = (book: Book) => {
    setEditingBook({ ...book });
    setIsNew(false);
    setUploadResult(null);
  };

  const handleNewBook = () => {
    setEditingBook({ ...emptyBook });
    setIsNew(true);
    setUploadResult(null);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setUploadResult(null);
  };

  const handleSaveBook = async () => {
    if (!editingBook) return;
    setSaving(true);
    try {
      if (isNew) {
        const res = await authFetch('/api/admin/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingBook),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to create book');
        }
        toast({ title: 'Book created!', description: `"${editingBook.title}" has been added to the library.` });
      } else {
        const res = await authFetch(`/api/admin/books/${editingBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingBook),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to update book');
        }
        toast({ title: 'Book updated!', description: `"${editingBook.title}" has been saved.` });
      }
      await fetchBooks();
      onBooksChanged();
      setEditingBook(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBook = async (book: Book) => {
    if (!confirm(`Are you sure you want to delete "${book.title}"? This cannot be undone.`)) return;
    try {
      const res = await authFetch(`/api/admin/books/${book.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete book');
      toast({ title: 'Book deleted', description: `"${book.title}" has been removed.` });
      await fetchBooks();
      onBooksChanged();
      if (editingBook?.id === book.id) setEditingBook(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await authFetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (editingBook) {
        setEditingBook({ ...editingBook, fullContent: data.content });
      }

      setUploadResult({ wordCount: data.wordCount, filename: data.filename });

      toast({
        title: 'Manuscript uploaded!',
        description: `${data.wordCount.toLocaleString()} words loaded from ${file.name}. It's been placed in the Full Manuscript field — save the book to store it.`,
      });
    } catch (error: any) {
      toast({ title: 'Upload Error', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setEditingBook({ ...editingBook, title, slug: isNew ? slug : editingBook?.slug });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden bg-card border-warm-200">
        {/* Header */}
        <div className="bg-warm-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-xl font-bold text-cream">Admin Panel</h2>
            {authToken && (
              <Badge className="bg-green-800/50 text-green-200 border border-green-600/30 font-sans text-[10px] px-2">
                Authenticated
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {authToken && (
              <button
                onClick={handleLogout}
                className="text-warm-400 hover:text-warm-200 transition-colors flex items-center gap-1 font-sans text-xs mr-2"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
            <button onClick={handleClose} className="text-warm-300 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* LOGIN SCREEN */}
        {!authToken ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mb-6">
              <Lock className="h-8 w-8 text-warm-700" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-warm-900 mb-2">
              Admin Access Required
            </h3>
            <p className="font-sans text-warm-700 text-sm mb-8 max-w-sm text-center leading-relaxed">
              This area is restricted. Enter the admin password to manage books and upload manuscripts.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <Label htmlFor="admin-password" className="font-sans text-sm text-warm-800 font-medium">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                    placeholder="Enter admin password"
                    className="bg-warm-50 border-warm-300 text-warm-900 font-sans pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-500 hover:text-warm-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="font-sans text-red-700 text-sm">{loginError}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loginLoading || !password}
                className="w-full bg-leather hover:bg-warm-800 text-cream font-sans text-sm tracking-wide uppercase py-5"
              >
                {loginLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Unlock Admin Panel
                  </>
                )}
              </Button>
            </form>

            <p className="font-sans text-warm-500 text-xs mt-6 text-center">
              Set your password in the <code className="bg-warm-100 px-1 rounded">.env</code> file under <code className="bg-warm-100 px-1 rounded">ADMIN_PASSWORD</code>
            </p>
          </div>
        ) : (
          /* MAIN ADMIN CONTENT */
          <Tabs defaultValue="books" className="flex-1 flex flex-col">
            <div className="px-6 pt-4 border-b border-warm-200">
              <TabsList className="bg-warm-100">
                <TabsTrigger value="books" className="font-sans text-sm data-[state=active]:bg-warm-800 data-[state=active]:text-cream">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Manage Books
                </TabsTrigger>
                <TabsTrigger value="upload" className="font-sans text-sm data-[state=active]:bg-warm-800 data-[state=active]:text-cream">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Manuscript
                </TabsTrigger>
              </TabsList>
            </div>

            {/* BOOKS TAB */}
            <TabsContent value="books" className="flex-1 m-0">
              <div className="flex h-[calc(90vh-14rem)]">
                {/* Book List */}
                <div className="w-1/3 border-r border-warm-200 flex flex-col">
                  <div className="p-4 border-b border-warm-100">
                    <Button onClick={handleNewBook} className="w-full bg-leather hover:bg-warm-800 text-cream font-sans text-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Book
                    </Button>
                  </div>
                  <ScrollArea className="flex-1">
                    {loading ? (
                      <div className="p-4 text-center">
                        <Loader2 className="h-6 w-6 animate-spin text-warm-400 mx-auto" />
                      </div>
                    ) : books.length === 0 ? (
                      <div className="p-4 text-center">
                        <p className="font-sans text-warm-600 text-sm">No books yet. Add your first one!</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {books.map((book) => (
                          <div
                            key={book.id}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors group ${
                              editingBook?.id === book.id
                                ? 'bg-gold/15 border border-gold/30'
                                : 'hover:bg-warm-50'
                            }`}
                            onClick={() => handleEditBook(book)}
                          >
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-10 h-14 object-cover rounded shadow-sm flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-sm font-semibold text-warm-900 truncate">
                                {book.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge className="text-[10px] font-sans bg-warm-100 text-warm-700 border-0 px-1.5 py-0">
                                  {book.genre}
                                </Badge>
                                {book.featured && (
                                  <Badge className="text-[10px] font-sans bg-gold/20 text-gold-dark border-0 px-1.5 py-0">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="font-sans text-warm-500 text-xs mt-0.5">
                                {book.fullContent ? `${book.fullContent.split(/\s+/).length.toLocaleString()} words` : 'No manuscript'}
                              </p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteBook(book); }}
                              className="opacity-0 group-hover:opacity-100 p-1.5 text-warm-400 hover:text-red-600 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>

                {/* Book Editor */}
                <div className="w-2/3 flex flex-col">
                  {editingBook ? (
                    <>
                      <ScrollArea className="flex-1 p-6">
                        <div className="space-y-5">
                          {/* Title & Slug */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="font-sans text-sm text-warm-800 font-medium">Title</Label>
                              <Input
                                value={editingBook.title || ''}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Book Title"
                                className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans"
                              />
                            </div>
                            <div>
                              <Label className="font-sans text-sm text-warm-800 font-medium">URL Slug</Label>
                              <Input
                                value={editingBook.slug || ''}
                                onChange={(e) => setEditingBook({ ...editingBook, slug: e.target.value })}
                                placeholder="book-slug"
                                className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans"
                              />
                            </div>
                          </div>

                          {/* Genre, Date, Order */}
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label className="font-sans text-sm text-warm-800 font-medium">Genre</Label>
                              <Input
                                value={editingBook.genre || ''}
                                onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
                                placeholder="Fiction"
                                className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans"
                              />
                            </div>
                            <div>
                              <Label className="font-sans text-sm text-warm-800 font-medium">Published Date</Label>
                              <Input
                                value={editingBook.publishedDate || ''}
                                onChange={(e) => setEditingBook({ ...editingBook, publishedDate: e.target.value })}
                                placeholder="2024"
                                className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans"
                              />
                            </div>
                            <div>
                              <Label className="font-sans text-sm text-warm-800 font-medium">Display Order</Label>
                              <Input
                                type="number"
                                value={editingBook.order ?? 0}
                                onChange={(e) => setEditingBook({ ...editingBook, order: parseInt(e.target.value) || 0 })}
                                className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans"
                              />
                            </div>
                          </div>

                          {/* Cover Image URL */}
                          <div>
                            <Label className="font-sans text-sm text-warm-800 font-medium">Cover Image URL</Label>
                            <Input
                              value={editingBook.coverImage || ''}
                              onChange={(e) => setEditingBook({ ...editingBook, coverImage: e.target.value })}
                              placeholder="/images/books/my-book.png"
                              className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans"
                            />
                            <p className="font-sans text-warm-500 text-xs mt-1">
                              Place images in <code className="bg-warm-100 px-1 rounded">public/images/books/</code> then reference as <code className="bg-warm-100 px-1 rounded">/images/books/filename.png</code>
                            </p>
                          </div>

                          {/* Featured toggle */}
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={editingBook.featured || false}
                              onCheckedChange={(checked) => setEditingBook({ ...editingBook, featured: checked })}
                            />
                            <Label className="font-sans text-sm text-warm-800">Featured Book (shows star badge)</Label>
                          </div>

                          <Separator className="bg-warm-200" />

                          {/* Description */}
                          <div>
                            <Label className="font-sans text-sm text-warm-800 font-medium">Description</Label>
                            <Textarea
                              value={editingBook.description || ''}
                              onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                              placeholder="A short description of the book..."
                              rows={3}
                              className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans resize-y"
                            />
                          </div>

                          {/* Snippet */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen className="h-4 w-4 text-gold-dark" />
                              <Label className="font-sans text-sm text-warm-800 font-medium">Free Excerpt / Snippet</Label>
                            </div>
                            <p className="font-sans text-warm-600 text-xs mb-2">
                              This is what non-members can read for free. Paste the first chapter or a compelling excerpt.
                            </p>
                            <Textarea
                              value={editingBook.snippet || ''}
                              onChange={(e) => setEditingBook({ ...editingBook, snippet: e.target.value })}
                              placeholder="The first chapter or a compelling excerpt..."
                              rows={8}
                              className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans resize-y"
                            />
                          </div>

                          <Separator className="bg-warm-200" />

                          {/* Full Manuscript */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="h-4 w-4 text-leather" />
                              <Label className="font-sans text-sm text-warm-800 font-medium">Full Manuscript</Label>
                            </div>
                            <p className="font-sans text-warm-600 text-xs mb-2">
                              The complete book — only visible to members. Upload via the Upload tab or paste directly.
                            </p>
                            {uploadResult && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-600" />
                                <span className="font-sans text-green-800 text-sm">
                                  Loaded <strong>{uploadResult.wordCount.toLocaleString()} words</strong> from {uploadResult.filename}
                                </span>
                              </div>
                            )}
                            <Textarea
                              value={editingBook.fullContent || ''}
                              onChange={(e) => setEditingBook({ ...editingBook, fullContent: e.target.value })}
                              placeholder="The full manuscript — members only content..."
                              rows={12}
                              className="mt-1 bg-warm-50 border-warm-300 text-warm-900 font-sans resize-y"
                            />
                            <p className="font-sans text-warm-500 text-xs mt-1">
                              {editingBook.fullContent
                                ? `${editingBook.fullContent.split(/\s+/).filter(Boolean).length.toLocaleString()} words`
                                : 'No manuscript content yet'}
                            </p>
                          </div>
                        </div>
                      </ScrollArea>

                      {/* Save/Cancel bar */}
                      <div className="border-t border-warm-200 px-6 py-3 flex items-center gap-3 bg-warm-50">
                        <Button
                          onClick={handleSaveBook}
                          disabled={saving || !editingBook.title}
                          className="bg-leather hover:bg-warm-800 text-cream font-sans text-sm"
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                          {isNew ? 'Create Book' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="border-warm-300 text-warm-700 font-sans text-sm"
                        >
                          Cancel
                        </Button>
                        {!isNew && editingBook.id && (
                          <Button
                            variant="outline"
                            onClick={() => handleDeleteBook(editingBook as Book)}
                            className="ml-auto border-red-200 text-red-600 hover:bg-red-50 font-sans text-sm"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                      <BookOpen className="h-12 w-12 text-warm-300 mb-4" />
                      <h3 className="font-serif text-lg font-semibold text-warm-800 mb-2">
                        Select a Book to Edit
                      </h3>
                      <p className="font-sans text-warm-600 text-sm max-w-sm">
                        Choose a book from the list, or click &ldquo;Add New Book&rdquo; to create one.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* UPLOAD TAB */}
            <TabsContent value="upload" className="flex-1 m-0">
              <div className="p-8 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <Upload className="h-12 w-12 text-warm-400 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-warm-900 mb-2">
                    Upload a Manuscript
                  </h3>
                  <p className="font-sans text-warm-700 text-sm leading-relaxed">
                    Upload a <strong>.txt</strong> or <strong>.md</strong> file and it will be loaded into the book editor.
                  </p>
                </div>

                <div className="border-2 border-dashed border-warm-300 rounded-xl p-8 text-center hover:border-gold transition-colors bg-warm-50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.md,.markdown,.text"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="manuscript-upload"
                  />
                  <label htmlFor="manuscript-upload" className="cursor-pointer flex flex-col items-center">
                    {uploading ? (
                      <>
                        <Loader2 className="h-10 w-10 text-warm-400 animate-spin mb-3" />
                        <p className="font-sans text-warm-700 text-sm font-medium">Uploading & parsing...</p>
                      </>
                    ) : (
                      <>
                        <FileText className="h-10 w-10 text-warm-400 mb-3" />
                        <p className="font-sans text-warm-800 text-sm font-medium mb-1">
                          Click to select a manuscript file
                        </p>
                        <p className="font-sans text-warm-500 text-xs">
                          Supports .txt and .md files up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>

                <div className="mt-8 bg-warm-50 rounded-lg p-6 border border-warm-200">
                  <h4 className="font-serif text-base font-semibold text-warm-900 mb-3">
                    How to Load Your Manuscripts
                  </h4>
                  <ol className="space-y-3 font-sans text-warm-700 text-sm leading-relaxed list-decimal list-inside">
                    <li><strong>Write your manuscript</strong> in any editor (Word, Google Docs, Scrivener, etc.)</li>
                    <li><strong>Export as plain text</strong> — save or export as <code className="bg-warm-100 px-1 rounded">.txt</code> or <code className="bg-warm-100 px-1 rounded">.md</code></li>
                    <li><strong>Upload the file here</strong> — it will be parsed and loaded into the editor</li>
                    <li><strong>Switch to &ldquo;Manage Books&rdquo; tab</strong> — create or edit a book, and the manuscript content will be in the Full Manuscript field</li>
                    <li><strong>Copy the first chapter</strong> into the Free Excerpt field for non-members to read</li>
                    <li><strong>Save the book</strong> — the full manuscript is stored for members only!</li>
                  </ol>
                  <Separator className="my-4 bg-warm-200" />
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-gold-dark mt-0.5 flex-shrink-0" />
                    <p className="font-sans text-warm-600 text-xs leading-relaxed">
                      <strong>Tip:</strong> You can also paste content directly into the Full Manuscript field
                      in the book editor — no file needed.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
