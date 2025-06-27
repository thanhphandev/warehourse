import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongodb';
import Category from '@/models/category';
import mongoose from 'mongoose';
import Product from '@/models/product';

// GET: Lấy danh sách category kèm số lượng sản phẩm
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'vi';

    const categories = await Category.find({ is_active: true }).lean();

    const productCounts = await Product.aggregate([
      { $unwind: '$categories' },
      { $match: { categories: { $in: categories.map(c => c._id) } } },
      { $group: { _id: '$categories', count: { $sum: 1 } } }
    ]);

    const productCountMap = productCounts.reduce((acc, item) => {
      acc[item._id.toString()] = item.count;
      return acc;
    }, {} as Record<string, number>);

    const categoriesWithCount = categories.map((category) => {
      return {
        _id: category._id,
        slug: category.slug,
        image: category.image ?? null,
        is_active: category.is_active,
        name: typeof category.name === 'object' ? category.name?.[lang] ?? null : category.name,
        description: typeof category.description === 'object' ? category.description?.[lang] ?? null : null,
        parent_id: category.parent_id ?? null,
        products: productCountMap[category._id as string] || 0,
      };
    });

    return NextResponse.json({
      success: true,
      code: 'CATEGORY_LIST_SUCCESS',
      message: 'Categories fetched successfully.',
      status: 200,
      data: categoriesWithCount
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      status: 500
    }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, parent_id, image, description } = body;

    if (!name?.vi || !name?.en || !slug) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Name (vi, en) and slug are required.',
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


    if (parent_id) {
      if (!mongoose.Types.ObjectId.isValid(parent_id)) {
        return NextResponse.json({
          success: false,
          code: 'INVALID_PARENT_ID',
          message: 'Parent ID is invalid.',
          status: 400,
        }, { status: 400 });
      }

      const parent = await Category.findById(parent_id).lean();
      if (!parent) {
        return NextResponse.json({
          success: false,
          code: 'PARENT_NOT_FOUND',
          message: 'Parent category not found.',
          status: 404,
        }, { status: 404 });
      }
    }

    const category = await Category.create({
      name,
      slug,
      parent_id: parent_id || null,
      image,
      description
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
    const body = await req.json();
    const { id, name, slug, parent_id, image, is_active } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Category ID is required.',
        status: 400,
      }, { status: 400 });
    }

    if (name && (!name.vi || !name.en)) {
      return NextResponse.json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Name must include both vi and en.',
        status: 400,
      }, { status: 400 });
    }

    await connectDb();

    let updateData: Record<string, any> = {
      name,
      slug,
      image,
      is_active,
      updated_at: new Date(),
    };

    // Validate and assign parent_id
    if (parent_id) {
      if (!mongoose.Types.ObjectId.isValid(parent_id)) {
        return NextResponse.json({
          success: false,
          code: 'INVALID_PARENT_ID',
          message: 'Parent ID is invalid.',
          status: 400,
        }, { status: 400 });
      }

      const parent = await Category.findById(parent_id).lean();
      if (!parent) {
        return NextResponse.json({
          success: false,
          code: 'PARENT_NOT_FOUND',
          message: 'Parent category not found.',
          status: 404,
        }, { status: 404 });
      }
      updateData.parent_id = parent_id;

    } else {
      updateData.parent_id = null;
      updateData.ancestors = [];
    }

    // Xóa các field không có giá trị (undefined)
    Object.keys(updateData).forEach(
      key => updateData[key] === undefined && delete updateData[key]
    );

    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

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
