import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Product from '@/models/product2';
import { ProductUpdateSchema } from '@/models/zod/product';
import { Types } from 'mongoose';

// GET /api/products/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({
      success: false,
      code: 'INVALID_ID',
      message: 'Invalid product id.',
      status: 400,
    }, { status: 400 });
  }

  try {
    await connectDb();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Product not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'PRODUCT_DETAIL_SUCCESS',
      message: 'Product fetched successfully.',
      status: 200,
      data: product,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      status: 500,
    }, { status: 500 });
  }
}


// PUT /api/products/:id
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_ID',
        message: 'Invalid product id.',
        status: 400,
      }, { status: 400 });
    }
    const body = await req.json();
    const parse = ProductUpdateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: parse.error.errors.map(e => e.message).join(', '),
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const product = await Product.findByIdAndUpdate(id, { ...body, updated_at: new Date() }, { new: true });
    if (!product) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Product not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'PRODUCT_UPDATE_SUCCESS',
      message: 'Product updated successfully.',
      status: 200,
      data: product,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      status: 500,
    }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_ID',
        message: 'Invalid product id.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Product not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'PRODUCT_DELETE_SUCCESS',
      message: 'Product deleted successfully.',
      status: 200,
      data: product,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      status: 500,
    }, { status: 500 });
  }
}
