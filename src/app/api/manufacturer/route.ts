import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Manufacturer from '@/models/manufacturer';

// GET: List all manufacturers
export async function GET() {
  try {
    await connectDb();
    const manufacturers = await Manufacturer.find();
    return NextResponse.json({
      success: true,
      code: 'MANUFACTURER_LIST_SUCCESS',
      message: 'Manufacturers fetched successfully.',
      status: 200,
      data: manufacturers,
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

// POST: Create a new manufacturer
export async function POST(req: NextRequest) {
  try {
    const { name, slug, logo, address, email, phone, website, description } = await req.json();
    if (!name || !slug) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Name and slug are required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const exists = await Manufacturer.findOne({ slug });
    if (exists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_SLUG',
        message: 'Manufacturer slug already exists.',
        status: 409,
      }, { status: 409 });
    }
    const manufacturer = await Manufacturer.create({ name, slug, logo, address, email, phone, website, description });
    return NextResponse.json({
      success: true,
      code: 'MANUFACTURER_CREATE_SUCCESS',
      message: 'Manufacturer created successfully.',
      status: 201,
      data: manufacturer,
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

// PUT: Update a manufacturer by id
export async function PUT(req: NextRequest) {
  try {
    const { id, name, slug, logo, address, email, phone, website, description } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Manufacturer id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const manufacturer = await Manufacturer.findByIdAndUpdate(id, { name, slug, logo, address, email, phone, website, description, updated_at: new Date() }, { new: true });
    if (!manufacturer) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Manufacturer not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'MANUFACTURER_UPDATE_SUCCESS',
      message: 'Manufacturer updated successfully.',
      status: 200,
      data: manufacturer,
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

// DELETE: Delete a manufacturer by id
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Manufacturer id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const manufacturer = await Manufacturer.findByIdAndDelete(id);
    if (!manufacturer) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Manufacturer not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'MANUFACTURER_DELETE_SUCCESS',
      message: 'Manufacturer deleted successfully.',
      status: 200,
      data: manufacturer,
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
