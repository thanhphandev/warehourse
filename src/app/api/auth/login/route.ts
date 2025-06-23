import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import User from '@/models/user';
import { verifyPassword, signJwt, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Email and password are required.',
        status: 400,
      }, { status: 400 });
    }

    await connectDb();
    const user = await User.findOne({ 'email.address': email });

    if (!user) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_CREDENTIALS',
        message: 'Email or password is incorrect.',
        status: 401,
      }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_CREDENTIALS',
        message: 'Email or password is incorrect.',
        status: 401,
      }, { status: 401 });
    }

    const token = await signJwt({
      userId: user._id.toString(),
      role: user.role,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      code: 'LOGIN_SUCCESS',
      message: 'Login successful.',
      status: 200,
      data: {
        userId: user._id,
        role: user.role,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      const message = error.message || 'An unexpected error occurred.';
      return NextResponse.json({
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        message,
        status: 500,
      }, { status: 500 });
    }

  }
}
