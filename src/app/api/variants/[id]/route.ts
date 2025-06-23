import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import ProductVariant from '@/models/product_variant';
import { ProductVariantUpdateSchema } from '@/models/zod/product_variant';
import { Types } from 'mongoose';

// GET /api/variants/:variantId
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_ID',
        message: 'Invalid variant id.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const variant = await ProductVariant.findById(params.id);
    if (!variant) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Variant not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'VARIANT_DETAIL_SUCCESS',
      message: 'Variant fetched successfully.',
      status: 200,
      data: variant,
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

// PUT /api/variants/:variantId
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_ID',
        message: 'Invalid variant id.',
        status: 400,
      }, { status: 400 });
    }
    const body = await req.json();
    const parse = ProductVariantUpdateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: parse.error.errors.map(e => e.message).join(', '),
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const variant = await ProductVariant.findByIdAndUpdate(params.id, { ...body, updated_at: new Date() }, { new: true });
    if (!variant) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Variant not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'VARIANT_UPDATE_SUCCESS',
      message: 'Variant updated successfully.',
      status: 200,
      data: variant,
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

// DELETE /api/variants/:variantId
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_ID',
        message: 'Invalid variant id.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const variant = await ProductVariant.findByIdAndDelete(params.id);
    if (!variant) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Variant not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'VARIANT_DELETE_SUCCESS',
      message: 'Variant deleted successfully.',
      status: 200,
      data: variant,
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
