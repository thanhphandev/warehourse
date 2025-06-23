import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICartItem {
  variant_id: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user_id: Types.ObjectId;
  items: ICartItem[];
  created_at: Date;
  updated_at: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  variant_id: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  quantity: { type: Number, required: true },
});

const CartSchema = new Schema<ICart>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
