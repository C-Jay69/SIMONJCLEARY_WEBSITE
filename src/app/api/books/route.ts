import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const books = await db.book.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        snippet: true,
        coverImage: true,
        genre: true,
        publishedDate: true,
        featured: true,
      },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
