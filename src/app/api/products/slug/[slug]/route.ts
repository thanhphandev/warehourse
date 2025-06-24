import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Product from '@/models/product2';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await connectDb();
    
    const product = await Product.findOne({ slug }).populate('brand_id').populate('category_ids');
    
    if (!product) {
      return NextResponse.json({
        success: false,
        code: 'PRODUCT_NOT_FOUND',
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
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    }, { status: 500 });
  }
}
