import { z } from 'zod';
import { Types } from 'mongoose';

export const ProductVariantStatusEnum = z.enum(['active', 'inactive']);

export const ProductVariantAttributeSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

export const ProductVariantCreateSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.object({
    base: z.number().min(0),
    sale: z.number().min(0),
  }),
  attributes: z.array(ProductVariantAttributeSchema),
  images: z.array(z.string().url()),
  is_default: z.boolean().optional(),
  status: ProductVariantStatusEnum.optional(),
});

export const ProductVariantUpdateSchema = ProductVariantCreateSchema.partial();
