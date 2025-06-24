import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Warehouse from '@/models/warehouse';

// GET: List all warehouses
export async function GET() {
  try {
    await connectDb();
    const warehouses = await Warehouse.find();
    return NextResponse.json({
      success: true,
      code: 'WAREHOUSE_LIST_SUCCESS',
      message: 'Warehouses fetched successfully.',
      status: 200,
      data: warehouses,
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

// POST: Create a new warehouse
export async function POST(req: NextRequest) {
  try {
    const { name, address, is_store } = await req.json();
    if (!name || !address || !address.street || !address.city) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Name, address.street, and address.city are required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const warehouse = await Warehouse.create({
      name,
      address,
      is_store: is_store !== undefined ? is_store : false,
    });
    return NextResponse.json({
      success: true,
      code: 'WAREHOUSE_CREATE_SUCCESS',
      message: 'Warehouse created successfully.',
      status: 201,
      data: warehouse,
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

// PUT: Update a warehouse by id
export async function PUT(req: NextRequest) {
  try {
    const { id, name, address, is_store } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Warehouse id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const update: Record<string, any> = {
      name,
      address,
      is_store,
      updated_at: new Date(),
    };
    Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);
    const warehouse = await Warehouse.findByIdAndUpdate(id, update, { new: true });
    if (!warehouse) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Warehouse not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'WAREHOUSE_UPDATE_SUCCESS',
      message: 'Warehouse updated successfully.',
      status: 200,
      data: warehouse,
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

// DELETE: Delete a warehouse by id
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Warehouse id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const warehouse = await Warehouse.findByIdAndDelete(id);
    if (!warehouse) {
      return NextResponse.json({
        success: false,
        code: 'NOT_FOUND',
        message: 'Warehouse not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'WAREHOUSE_DELETE_SUCCESS',
      message: 'Warehouse deleted successfully.',
      status: 200,
      data: warehouse,
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
