import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth';

export async function POST() {
  await clearAuthCookie();
  return NextResponse.json({
    success: true,
    code: 'LOGOUT_SUCCESS',
    message: 'You have been logged out.',
    status: 200,
  }, { status: 200 });
}
