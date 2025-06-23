import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import User, { IUser } from '@/models/user';
import { verifyJwt } from '@/lib/auth';
import { HydratedDocument } from 'mongoose';

interface MeResponseSuccess {
  success: true;
  code: 'USER_FETCH_SUCCESS';
  message: string;
  status: 200;
  data: {
    user: Omit<IUser, 'password'>;
  };
}

interface MeResponseError {
  success: false;
  code: 'UNAUTHORIZED' | 'INVALID_TOKEN' | 'USER_NOT_FOUND' | 'INTERNAL_ERROR';
  message: string;
  status: number;
}

type MeResponse = MeResponseSuccess | MeResponseError;

export async function GET(req: NextRequest): Promise<NextResponse<MeResponse>> {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({
        success: false,
        code: 'UNAUTHORIZED',
        message: 'Missing authentication token.',
        status: 401,
      }, { status: 401 });
    }

    const payload = await verifyJwt(token);
    if (!payload) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_TOKEN',
        message: 'Token is invalid or expired.',
        status: 401,
      }, { status: 401 });
    }

    await connectDb();

    const user = await User.findById(payload.userId).select('-password') as HydratedDocument<Omit<IUser, 'password'>>;

    if (!user) {
      return NextResponse.json({
        success: false,
        code: 'USER_NOT_FOUND',
        message: 'No user found for this token.',
        status: 404,
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      code: 'USER_FETCH_SUCCESS',
      message: 'User retrieved successfully.',
      status: 200,
      data: {
        user: user.toObject(), // remove mongoose prototype methods
      },
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_ERROR',
      message: error instanceof Error ? error.message : 'Unexpected error occurred.',
      status: 500,
    }, { status: 500 });
  }
}
