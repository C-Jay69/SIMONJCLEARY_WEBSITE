import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken, getAuthTokenFromRequest } from '@/lib/admin-auth';

// GET all books (including fullContent for admin) — requires auth
export async function GET(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  if (!token || !(await validateAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const books = await db.book.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

// CREATE a new book — requires auth
export async function POST(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  if (!token || !(await validateAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, description, snippet, fullContent, coverImage, genre, publishedDate, featured, order } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    // Check for duplicate slug
    const existing = await db.book.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'A book with this slug already exists' }, { status: 409 });
    }

    const book = await db.book.create({
      data: {
        title,
        slug,
        description: description || '',
        snippet: snippet || '',
        fullContent: fullContent || '',
        coverImage: coverImage || '/images/books/book_placeholder.png',
        genre: genre || 'Fiction',
        publishedDate: publishedDate || new Date().getFullYear().toString(),
        featured: featured || false,
        order: order || 0,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
