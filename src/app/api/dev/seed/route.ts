import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import { connectDb } from '@/lib/mongodb';

import Product from '@/models/product2';
import ProductVariant from '@/models/product_variant';
import Category from '@/models/category';
import Brand from '@/models/brand';

const NUM_BRANDS = 10;
const NUM_CATEGORIES = 25;
const NUM_PRODUCTS = 100;
const VARIANTS_PER_PRODUCT = 3;

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
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: '❌ Not allowed in production' }, { status: 403 });
  }

  try {
    await connectDb();

    // Clear all
    await Promise.all([
      ProductVariant.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Brand.deleteMany({})
    ]);

    const brandSlugs = new Set<string>();
    const categorySlugs = new Set<string>();
    const productSlugs = new Set<string>();

    // --- BRANDS ---
    const brands = Array.from({ length: NUM_BRANDS }).map(() => {
      const name = faker.company.name();
      return {
        name,
        slug: generateUniqueSlug(name, brandSlugs),
        logo: faker.image.urlLoremFlickr({ category: 'logo' }),
        description: faker.company.catchPhrase(),
        created_at: new Date(),
        updated_at: new Date()
      };
    });
    const createdBrands = await Brand.insertMany(brands);

    // --- CATEGORIES ---
    const parentCategories = Array.from({ length: 7 }).map(() => {
      const name = faker.commerce.department();
      return {
        name,
        slug: generateUniqueSlug(name, categorySlugs),
        ancestors: [],
        is_active: true,
        image: faker.image.urlLoremFlickr({ category: 'fashion' }),
        created_at: new Date(),
        updated_at: new Date()
      };
    });
    const createdParentCategories = await Category.insertMany(parentCategories);

    const childCategories = Array.from({ length: NUM_CATEGORIES - 7 }).map(() => {
      const parent = faker.helpers.arrayElement(createdParentCategories);
      const name = faker.commerce.productAdjective() + ' ' + parent.name;
      return {
        name,
        slug: generateUniqueSlug(name, categorySlugs),
        parent_id: parent._id,
        ancestors: [
          ...parent.ancestors,
          { _id: parent._id, name: parent.name, slug: parent.slug }
        ],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      };
    });
    const createdChildCategories = await Category.insertMany(childCategories);
    const allCategories = [...createdParentCategories, ...createdChildCategories];

    // --- PRODUCTS ---
    const products = Array.from({ length: NUM_PRODUCTS }).map(() => {
      const name = faker.commerce.productName();
      const brand = faker.helpers.arrayElement(createdBrands);
      const categories = faker.helpers.arrayElements(allCategories, faker.number.int({ min: 1, max: 3 }));
      return {
        name,
        slug: generateUniqueSlug(name + '-' + faker.string.alphanumeric(5), productSlugs),
        description: faker.commerce.productDescription(),
        brand_id: brand._id,
        category_ids: categories.map(c => c._id),
        tags: faker.helpers.arrayElements(['new', 'hot', 'sale', 'trending'], 2),
        status: faker.helpers.arrayElement(['published', 'draft']),
        created_at: new Date(),
        updated_at: new Date()
      };
    });
    const createdProducts = await Product.insertMany(products);

    // --- VARIANTS ---
    const variants = createdProducts.flatMap(product => {
      const isSingle = faker.datatype.boolean();
      const n = isSingle ? 1 : VARIANTS_PER_PRODUCT;

      return Array.from({ length: n }).map((_, i) => {
        const base = parseFloat(faker.commerce.price({ min: 100000, max: 5000000, dec: 0 }));
        return {
          product_id: product._id,
          name: `${product.name} - ${faker.color.human()} - ${faker.helpers.arrayElement(['S', 'M', 'L', 'XL'])}`,
          sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
          price: { base, sale: base * 0.9 },
          attributes: [
            { key: 'Color', value: faker.color.human() },
            { key: 'Size', value: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']) }
          ],
          images: [
            faker.image.urlLoremFlickr({ category: 'product' }),
            faker.image.urlLoremFlickr({ category: 'product' })
          ],
          is_default: i === 0,
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        };
      });
    });
    await ProductVariant.insertMany(variants);

    return NextResponse.json({ message: '✅ Seed completed successfully' });
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    return NextResponse.json({ message: '❌ Seeding failed', error: String(err) }, { status: 500 });
  }
}
