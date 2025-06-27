import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Product, { IProduct } from '@/models/product';

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'vi';

    // Parse and validate pagination
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json({
        success: false,
        code: 'INVALID_QUERY_PARAMS',
        message: 'Page and limit must be valid positive integers.',
        status: 400,
      }, { status: 400 });
    }

    // Construct filters
    const filter: Record<string, any> = {};
    const brand_id = searchParams.get('brand_id');
    const manufacturer_id = searchParams.get('manufacturer_id');
    const category_id = searchParams.get('category_id');
    const search = searchParams.get('search');

    if (brand_id) filter.brand_id = brand_id;
    if (manufacturer_id) filter.manufacturer_id = manufacturer_id;
    if (category_id) filter.categories = category_id;
    if (search) {
      filter[`product_name.${lang}`] = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    // Fetch data
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("brand_id")
        .populate("manufacturer_id")
        .populate("categories")
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter)
    ]);

    // Transform data by language
    const mappedProducts = products.map((product: IProduct) => {
      const obj = product.toObject();

      return {
        ...obj,
        product_name: obj.product_name?.[lang] || obj.product_name,
        description: obj.description?.[lang] || null,
        ingredients: obj.ingredients?.[lang] || obj.ingredients,
        usage_instructions: obj.usage_instructions?.[lang] || [],
        storage_instructions: obj.storage_instructions?.[lang] || '',
        packaging_details: obj.packaging_details?.[lang] || null,
        dietary_info: {
          suitability: obj.dietary_info?.suitability?.[lang] || [],
          allergen_warnings: obj.dietary_info?.allergen_warnings?.[lang] || [],
        },
        additional_info: Array.isArray(obj.additional_info)
          ? obj.additional_info.map((info: any) => ({
              key: info[`key_${lang}`] || '',
              value: info[`value_${lang}`] || '',
            }))
          : [],
      };
    });

    return NextResponse.json({
      success: true,
      code: 'PRODUCT_LIST_SUCCESS',
      message: 'Products fetched successfully.',
      status: 200,
      data: mappedProducts,
      pagination: {
        page,
        limit,
        total,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('[PRODUCTS_GET_ERROR]', error);
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

    await connectDb();

    // Check duplicate slug
    const slugExists = await Product.findOne({ slug: body.slug });
    if (slugExists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_SLUG',
        message: 'Product slug already exists.',
        status: 409,
      }, { status: 409 });
    }

    // ✅ Check duplicate SKU
    const skuExists = await Product.findOne({ sku: body.sku });
    if (skuExists) {
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_SKU',
        message: 'Product SKU already exists.',
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
  } catch (error: any) {
    // Optional: handle Mongo duplicate key error safely
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyPattern || {})[0];
      return NextResponse.json({
        success: false,
        code: 'DUPLICATE_KEY',
        message: `${dupField.toUpperCase()} must be unique.`,
        status: 409,
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      status: 500,
    }, { status: 500 });
  }
}
