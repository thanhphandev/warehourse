import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInventoryLog extends Document {
  variant_id: Types.ObjectId;
  sku: string;
  warehouse_id: Types.ObjectId;
  quantity_change: number;
  reason: 'SALE' | 'RETURN' | 'STOCK_IN' | 'ADJUSTMENT';
  related_order_id?: Types.ObjectId;
  notes?: string;
  created_at: Date;
}

const InventoryLogSchema = new Schema<IInventoryLog>({
  variant_id: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  sku: { type: String, required: true },
  warehouse_id: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  quantity_change: { type: Number, required: true },
  reason: { type: String, enum: ['SALE', 'RETURN', 'STOCK_IN', 'ADJUSTMENT'], required: true },
  related_order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.InventoryLog || mongoose.model<IInventoryLog>('InventoryLog', InventoryLogSchema);
