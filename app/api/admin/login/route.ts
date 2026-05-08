import { NextRequest, NextResponse } from 'next/server';
import { setAdminSessionCookie, verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { success: false, error: 'Incorrect password' },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  setAdminSessionCookie(response);

  return response;
}
