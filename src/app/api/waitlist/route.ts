import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const existing = await db.waitlistEntry.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'You are already on the waitlist!' },
      );
    }

    await db.waitlistEntry.create({
      data: { email, name },
    });

    return NextResponse.json({
      message: 'You have been added to the waitlist!',
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
