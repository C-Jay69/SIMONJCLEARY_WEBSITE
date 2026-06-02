import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token || !(await validateAdminToken(token))) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
