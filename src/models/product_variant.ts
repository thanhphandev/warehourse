import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProductVariantAttribute {
  key: string;
  value: string;
}

export interface IProductVariant extends Document {
  product_id: Types.ObjectId;
  name: string;
  sku: string;
  price: {
    base: number;
    sale: number;
  };
  attributes: IProductVariantAttribute[];
  images: string[];
  is_default: boolean;
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
}

const ProductVariantAttributeSchema = new Schema<IProductVariantAttribute>({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const ProductVariantSchema = new Schema<IProductVariant>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  price: {
    base: { type: Number, required: true },
    sale: { type: Number, required: true },
  },
  attributes: [ProductVariantAttributeSchema],
  images: [{ type: String }],
  is_default: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.ProductVariant || mongoose.model<IProductVariant>('ProductVariant', ProductVariantSchema);
