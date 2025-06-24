import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  brand_id: Types.ObjectId;
  manufacturer?: string;
  category_ids: Types.ObjectId[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  created_at: Date;
  updated_at: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  brand_id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  category_ids: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
