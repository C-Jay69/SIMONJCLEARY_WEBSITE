import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = await db.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Return the book with snippet but without fullContent
    // fullContent is only provided to members via a separate endpoint
    return NextResponse.json({
      id: book.id,
      title: book.title,
      slug: book.slug,
      description: book.description,
      snippet: book.snippet,
      coverImage: book.coverImage,
      genre: book.genre,
      publishedDate: book.publishedDate,
      featured: book.featured,
      hasFullContent: !!book.fullContent,
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}
