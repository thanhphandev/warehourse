import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPromotionCondition {
  min_spend: number;
  applies_to: {
    type: 'ALL' | 'CATEGORIES' | 'BRANDS'| 'PRODUCTS'| 'VARIANTS';
    ids: Types.ObjectId[];
  };
}

export interface IPromotion extends Document {
  name: string;
  code: string;
  type: 'PERCENTAGE_OFF' | 'FIXED_AMOUNT_OFF' | 'FREE_SHIPPING';
  value: number;
  conditions: IPromotionCondition;
  start_date: Date;
  end_date: Date;
  usage_limit: number;
  usage_count: number;
  usage_limit_per_user: Number,
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const PromotionSchema = new Schema<IPromotion>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['PERCENTAGE_OFF', 'FIXED_AMOUNT_OFF'], required: true },
  value: { type: Number, required: true },
  conditions: {
    min_spend: { type: Number, required: true },
    applies_to: {
      type: { type: String, enum: ['ALL', 'CATEGORIES', 'BRANDS', 'PRODUCTS', 'VARIANTS'], required: true },
      ids: [{ type: Schema.Types.ObjectId, required: true }],
    },
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  usage_limit: { type: Number, required: true },
  usage_count: { type: Number, default: 0 },
  usage_limit_per_user: { type: Number, default: 1 },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Promotion || mongoose.model<IPromotion>('Promotion', PromotionSchema);
