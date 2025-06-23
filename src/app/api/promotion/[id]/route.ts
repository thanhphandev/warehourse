import { NextRequest, NextResponse } from 'next/server';
import Promotion from '@/models/promotion';
import { connectDb } from '@/lib/mongodb';

// GET: Get promotion detail
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDb();
    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return NextResponse.json({
        success: false,
        code: 'PROMOTION_NOT_FOUND',
        message: 'Promotion not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'PROMOTION_DETAIL_SUCCESS',
      message: 'Promotion fetched successfully.',
      status: 200,
      data: promotion,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    }, { status: 500 });
  }
}

// PUT: Update promotion
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDb();
    const body = await req.json();
    const promotion = await Promotion.findByIdAndUpdate(id, body, { new: true });
    if (!promotion) {
      return NextResponse.json({
        success: false,
        code: 'PROMOTION_NOT_FOUND',
        message: 'Promotion not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'PROMOTION_UPDATE_SUCCESS',
      message: 'Promotion updated successfully.',
      status: 200,
      data: promotion,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    }, { status: 500 });
  }
}

// DELETE: Delete promotion
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDb();
    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) {
      return NextResponse.json({
        success: false,
        code: 'PROMOTION_NOT_FOUND',
        message: 'Promotion not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'PROMOTION_DELETE_SUCCESS',
      message: 'Promotion deleted successfully.',
      status: 200,
      data: promotion,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    }, { status: 500 });
  }
}
