import { NextRequest, NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin password not configured. Set ADMIN_PASSWORD in your environment variables.' },
        { status: 500 }
      );
    }

    if (!password || password !== adminPassword) {
      // Small delay to discourage brute force
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    // Generate a JWT token (stateless — works on Vercel serverless)
    const token = await generateAdminToken();

    return NextResponse.json({
      token,
      message: 'Authenticated successfully',
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
