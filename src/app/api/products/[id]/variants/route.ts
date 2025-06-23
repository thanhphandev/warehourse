import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import ProductVariant from '@/models/product_variant';
import { ProductVariantCreateSchema } from '@/models/zod/product_variant';
import { Types } from 'mongoose';

// GET /api/products/:productId/variants
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    const variants = await ProductVariant.find({ product_id: id });
    return NextResponse.json({
      success: true,
      code: 'VARIANT_LIST_SUCCESS',
      message: 'Variants fetched successfully.',
      status: 200,
      data: variants,
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

// POST /api/products/:productId/variants
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    const parse = ProductVariantCreateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: parse.error.errors.map(e => e.message).join(', '),
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const exists = await ProductVariant.findOne({ sku: body.sku });
    if (exists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_SKU',
        message: 'Variant SKU already exists.',
        status: 409,
      }, { status: 409 });
    }
    const variant = await ProductVariant.create({ ...body, product_id: id });
    return NextResponse.json({
      success: true,
      code: 'VARIANT_CREATE_SUCCESS',
      message: 'Variant created successfully.',
      status: 201,
      data: variant,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      status: 500,
    }, { status: 500 });
  }
}
