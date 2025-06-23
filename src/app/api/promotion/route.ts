import { NextRequest, NextResponse } from 'next/server';
import Promotion from '@/models/promotion';

// GET: List all promotions
export async function GET() {
  try {
    const promotions = await Promotion.find();
    return NextResponse.json({
      success: true,
      code: 'PROMOTION_LIST_SUCCESS',
      message: 'Promotions fetched successfully.',
      status: 200,
      data: promotions,
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

// POST: Create a new promotion
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const promotion = await Promotion.create(body);
    return NextResponse.json({
      success: true,
      code: 'PROMOTION_CREATE_SUCCESS',
      message: 'Promotion created successfully.',
      status: 201,
      data: promotion,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    }, { status: 500 });
  }
}
