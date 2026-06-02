import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken, getAuthTokenFromRequest } from '@/lib/admin-auth';

// GET single book (admin - includes fullContent) — requires auth
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getAuthTokenFromRequest(request);
  if (!token || !(await validateAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const book = await db.book.findUnique({ where: { id } });
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

// UPDATE a book — requires auth
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getAuthTokenFromRequest(request);
  if (!token || !(await validateAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const book = await db.book.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.snippet !== undefined && { snippet: body.snippet }),
        ...(body.fullContent !== undefined && { fullContent: body.fullContent }),
        ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
        ...(body.genre !== undefined && { genre: body.genre }),
        ...(body.publishedDate !== undefined && { publishedDate: body.publishedDate }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.order !== undefined && { order: body.order }),
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

// DELETE a book — requires auth
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getAuthTokenFromRequest(request);
  if (!token || !(await validateAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.book.delete({ where: { id } });
    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
