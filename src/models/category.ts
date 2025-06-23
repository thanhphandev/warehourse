import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICategoryAncestor {
  _id: Types.ObjectId;
  name: string;
  slug: string;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  parent_id?: Types.ObjectId;
  ancestors: ICategoryAncestor[];
  image?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const CategoryAncestorSchema = new Schema<ICategoryAncestor>({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Category' },
  ancestors: [CategoryAncestorSchema],
  image: { type: String },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
