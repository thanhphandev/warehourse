import { z } from 'zod';
import { Types } from 'mongoose';

export const ProductStatusEnum = z.enum(['draft', 'published', 'archived']);

export const ProductCreateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  brand_id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid brand_id',
  }),
  category_ids: z.array(z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid category_id',
  })),
  tags: z.array(z.string()),
  status: ProductStatusEnum.optional(),
});

export const ProductUpdateSchema = ProductCreateSchema.partial();
