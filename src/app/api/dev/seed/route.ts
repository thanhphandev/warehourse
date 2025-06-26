import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import { connectDb } from '@/lib/mongodb';

import Category from '@/models/category';
import Brand from '@/models/brand';
import Product from '@/models/product';


// 👉 Ensure unique slug
function generateUniqueSlug(base: string, existingSlugs: Set<string>) {
  let slug = faker.helpers.slugify(base).toLowerCase();
  let counter = 1;
  while (existingSlugs.has(slug)) {
    slug = `${slug}-${counter++}`;
  }
  existingSlugs.add(slug);
  return slug;
}

export async function POST() {

  try {
    await connectDb();

    // Clear all
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Brand.deleteMany({})
    ]);

    return NextResponse.json({ message: '✅ Seed completed successfully' });
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    return NextResponse.json({ message: '❌ Seeding failed', error: String(err) }, { status: 500 });
  }
}
