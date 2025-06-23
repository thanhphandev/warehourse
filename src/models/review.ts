import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview extends Document {
  user_id: Types.ObjectId;
  product_id: Types.ObjectId;
  order_id: Types.ObjectId;
  rating: number;
  comment?: string;
  images: string[];
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
}

const ReviewSchema = new Schema<IReview>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  images: [{ type: String }],
  is_approved: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
