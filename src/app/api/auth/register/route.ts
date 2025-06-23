import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import User from '@/models/user';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Missing required fields.',
        status: 400,
      }, { status: 400 });
    }

    await connectDb();

    const existingUser = await User.findOne({ 'email.address': email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        code: 'USER_EXISTS',
        message: 'Email already exists.',
        status: 409,
      }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      full_name: name,
      email: {
        address: email,
        is_verified: false,
      },
      password: hashedPassword,
      role: 'customer',
      addresses: [],
      wishlist: [],
    });

    return NextResponse.json({
      success: true,
      code: 'USER_REGISTERED',
      message: 'User registered successfully.',
      status: 201,
      data: {
        userId: newUser._id,
        full_name: newUser.full_name,
        email: newUser.email.address,
        role: newUser.role,
      }
    }, { status: 201 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        code: 'INTERNAL_ERROR',
        message: error.message || 'An unexpected error occurred. Please try again later.',
        status: 500,
      }, { status: 500 });
    }
  }
}
   