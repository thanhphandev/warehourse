import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Product from '@/models/product2';
import { ProductCreateSchema } from '@/models/zod/product';


export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const filter: Record<string, any> = {};

    // Validate and extract filters
    const status = searchParams.get('status');
    const brand_id = searchParams.get('brand_id');
    const category_id = searchParams.get('category_id');
    const search = searchParams.get('search');
    const pageRaw = searchParams.get('page');
    const limitRaw = searchParams.get('limit');

    // Validate page & limit
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

    // Apply filters
    if (status) filter.status = status;
    if (brand_id) filter.brand_id = brand_id;
    if (category_id) filter.category_ids = category_id;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(limit),
      Product.countDocuments(filter)
    ]);

    return NextResponse.json({
      success: true,
      code: 'PRODUCT_LIST_SUCCESS',
      message: 'Products fetched successfully.',
      status: 200,
      data: products,
      pagination: {
        page,
        limit,
        total
      }
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


// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = ProductCreateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: parse.error.errors.map(e => e.message).join(', '),
        status: 400,
      }, { status: 400 });
    }
    await connectDb();
    const exists = await Product.findOne({ slug: body.slug });
    if (exists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_SLUG',
        message: 'Product slug already exists.',
        status: 409,
      }, { status: 409 });
    }
    const product = await Product.create({ ...body });
    return NextResponse.json({
      success: true,
      code: 'PRODUCT_CREATE_SUCCESS',
      message: 'Product created successfully.',
      status: 201,
      data: product,
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
