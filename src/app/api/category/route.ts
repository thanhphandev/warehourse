import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Category from '@/models/category';
import mongoose from 'mongoose';

// Helper: build ancestors array
async function buildAncestors(parent_id: string) {
  if (!parent_id) return [];
  const parent = await Category.findById(parent_id);
  if (!parent) throw new Error('Parent category not found.');
  return [
    ...parent.ancestors,
    { _id: parent._id, name: parent.name, slug: parent.slug },
  ];
}

// GET: List all categories
export async function GET() {
  try {
    await connectDb();
    const categories = await Category.find();
    return NextResponse.json({
      success: true,
      code: 'CATEGORY_LIST_SUCCESS',
      message: 'Categories fetched successfully.',
      status: 200,
      data: categories,
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

// POST: Create a new category
export async function POST(req: NextRequest) {
  try {
    const { name, slug, parent_id, image, is_active } = await req.json();
    if (!name || !slug) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Name and slug are required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const exists = await Category.findOne({ slug });
    if (exists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_SLUG',
        message: 'Category slug already exists.',
        status: 409,
      }, { status: 409 });
    }
    let ancestors = [];
    if (parent_id) {
      if (!mongoose.Types.ObjectId.isValid(parent_id)) {
        return NextResponse.json({
          success: false,
          code: 'INVALID_PARENT_ID',
          message: 'Parent id is invalid.',
          status: 400,
        }, { status: 400 });
      }
      ancestors = await buildAncestors(parent_id);
    }
    const category = await Category.create({
      name,
      slug,
      parent_id: parent_id || undefined,
      ancestors,
      image,
      is_active: is_active !== undefined ? is_active : true,
    });
    return NextResponse.json({
      success: true,
      code: 'CATEGORY_CREATE_SUCCESS',
      message: 'Category created successfully.',
      status: 201,
      data: category,
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

// PUT: Update a category by id
export async function PUT(req: NextRequest) {
  try {
    const { id, name, slug, parent_id, image, is_active } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Category id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    let ancestors = [];
    if (parent_id) {
      if (!mongoose.Types.ObjectId.isValid(parent_id)) {
        return NextResponse.json({
          success: false,
          code: 'INVALID_PARENT_ID',
          message: 'Parent id is invalid.',
          status: 400,
        }, { status: 400 });
      }
      ancestors = await buildAncestors(parent_id);
    }
    const update: any = {
      name,
      slug,
      parent_id: parent_id || undefined,
      ancestors,
      image,
      is_active,
      updated_at: new Date(),
    };
    // Remove undefined fields
    Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);
    const category = await Category.findByIdAndUpdate(id, update, { new: true });
    if (!category) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Category not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'CATEGORY_UPDATE_SUCCESS',
      message: 'Category updated successfully.',
      status: 200,
      data: category,
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

// DELETE: Delete a category by id
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Category id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Category not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'CATEGORY_DELETE_SUCCESS',
      message: 'Category deleted successfully.',
      status: 200,
      data: category,
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
