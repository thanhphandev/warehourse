import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Inventory from '@/models/inventory';
import ProductVariant from '@/models/product_variant';
import Warehouse from '@/models/warehouse';
import { z } from 'zod';

const InventoryCreateSchema = z.object({
  variant_id: z.string().min(1),
  warehouse_id: z.string().min(1),
  quantity: z.number().int().min(0),
});

const InventoryUpdateSchema = z.object({
  quantity: z.number().int().min(0),
});

// GET /api/inventory
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const filter: Record<string, any> = {};
    const variant_id = searchParams.get('variant_id');
    const warehouse_id = searchParams.get('warehouse_id');
    const pageRaw = searchParams.get('page');
    const limitRaw = searchParams.get('limit');
    const page = parseInt(pageRaw || '1', 10);
    const limit = parseInt(limitRaw || '20', 10);
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_QUERY_PARAMS',
        message: 'Page and limit must be valid positive integers.',
        status: 400,
      }, { status: 400 });
    }
    if (variant_id) filter.variant_id = variant_id;
    if (warehouse_id) filter.warehouse_id = warehouse_id;
    const skip = (page - 1) * limit;
    const [inventories, total] = await Promise.all([
      Inventory.find(filter).skip(skip).limit(limit),
      Inventory.countDocuments(filter)
    ]);
    return NextResponse.json({
      success: true,
      code: 'INVENTORY_LIST_SUCCESS',
      message: 'Inventory fetched successfully.',
      status: 200,
      data: inventories,
      pagination: { page, limit, total }
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

// POST /api/inventory
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = InventoryCreateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: parse.error.errors.map(e => e.message).join(', '),
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    // Check if variant and warehouse exist
    const variant = await ProductVariant.findById(body.variant_id);
    if (!variant) {
      return NextResponse.json({
        success: false,
        code: 'VARIANT_NOT_FOUND',
        message: 'Product variant not found.',
        status: 404,
      }, { status: 404 });
    }
    const warehouse = await Warehouse.findById(body.warehouse_id);
    if (!warehouse) {
      return NextResponse.json({
        success: false,
        code: 'WAREHOUSE_NOT_FOUND',
        message: 'Warehouse not found.',
        status: 404,
      }, { status: 404 });
    }
    // Check for duplicate
    const exists = await Inventory.findOne({
      variant_id: body.variant_id,
      warehouse_id: body.warehouse_id
    });
    if (exists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_INVENTORY',
        message: 'Inventory record already exists for this variant and warehouse.',
        status: 409,
      }, { status: 409 });
    }
    const inventory = await Inventory.create({
      variant_id: body.variant_id,
      warehouse_id: body.warehouse_id,
      quantity: body.quantity
    });
    return NextResponse.json({
      success: true,
      code: 'INVENTORY_CREATE_SUCCESS',
      message: 'Inventory created successfully.',
      status: 201,
      data: inventory,
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

// PATCH /api/inventory?id=...  (update quantity)
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'MISSING_ID',
        message: 'Inventory id is required.',
        status: 400,
      }, { status: 400 });
    }
    const body = await req.json();
    const parse = InventoryUpdateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: parse.error.errors.map(e => e.message).join(', '),
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const inventory = await Inventory.findByIdAndUpdate(
      id,
      { quantity: body.quantity, updated_at: new Date() },
      { new: true }
    );
    if (!inventory) {
      return NextResponse.json({
        success: false,
        code: 'INVENTORY_NOT_FOUND',
        message: 'Inventory record not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'INVENTORY_UPDATE_SUCCESS',
      message: 'Inventory updated successfully.',
      status: 200,
      data: inventory,
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

// DELETE /api/inventory?id=...
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'MISSING_ID',
        message: 'Inventory id is required.',
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const inventory = await Inventory.findByIdAndDelete(id);
    if (!inventory) {
      return NextResponse.json({
        success: false,
        code: 'INVENTORY_NOT_FOUND',
        message: 'Inventory record not found.',
        status: 404,
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      code: 'INVENTORY_DELETE_SUCCESS',
      message: 'Inventory deleted successfully.',
      status: 200,
      data: inventory,
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
