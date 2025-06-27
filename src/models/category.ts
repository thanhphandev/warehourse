import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICategoryName {
  vi: string;
  en: string;
}

export interface IDescription {
  vi?: string | null;
  en?: string | null;
}

export interface ICategory extends Document {
  name: ICategoryName | string;
  description?: IDescription | null | string;
  slug: string;
  parent_id?: Types.ObjectId;
  image?: string;
  products?: number; // Optional field to store the number of products in the category
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    vi: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    vi: { type: String, default: null },
    en: { type: String, default: null },
  },
  slug: { type: String, required: true, unique: true },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
