import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, tier } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if member already exists
    const existing = await db.member.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create member (Stripe integration would happen here in production)
    const member = await db.member.create({
      data: {
        name,
        email,
        membershipTier: tier || 'reader',
      },
    });

    return NextResponse.json({
      id: member.id,
      name: member.name,
      email: member.email,
      tier: member.membershipTier,
      message: 'Welcome to the Simon J Cleary library!',
    });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { error: 'Failed to create membership' },
      { status: 500 }
    );
  }
}
