import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Brand from '@/models/brand';

// GET: List all brands
export async function GET() {
  try {
    await connectDb();
    const brands = await Brand.find();
    return NextResponse.json({
      success: true,
      code: 'BRAND_LIST_SUCCESS',
      message: 'Brands fetched successfully.',
      status: 200,
      data: brands,
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

// POST: Create a new brand
export async function POST(req: NextRequest) {
  try {
    const { name, slug, logo, description } = await req.json();
    if (!name || !slug) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Name and slug are required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const exists = await Brand.findOne({ slug });
    if (exists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_SLUG',
        message: 'Brand slug already exists.',
        status: 409,
      }, { status: 409 });
    }
    const brand = await Brand.create({ name, slug, logo, description });
    return NextResponse.json({
      success: true,
      code: 'BRAND_CREATE_SUCCESS',
      message: 'Brand created successfully.',
      status: 201,
      data: brand,
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

// PUT: Update a brand by id
export async function PUT(req: NextRequest) {
  try {
    const { id, name, slug, logo, description } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Brand id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const brand = await Brand.findByIdAndUpdate(id, { name, slug, logo, description, updated_at: new Date() }, { new: true });
    if (!brand) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Brand not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'BRAND_UPDATE_SUCCESS',
      message: 'Brand updated successfully.',
      status: 200,
      data: brand,
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

// DELETE: Delete a brand by id
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Brand id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Brand not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'BRAND_DELETE_SUCCESS',
      message: 'Brand deleted successfully.',
      status: 200,
      data: brand,
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
