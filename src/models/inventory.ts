import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInventory extends Document {
  variant_id: Types.ObjectId;
  warehouse_id: Types.ObjectId;
  quantity: number;
  updated_at: Date;
}

const InventorySchema = new Schema<IInventory>({
  variant_id: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  warehouse_id: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  quantity: { type: Number, required: true },
  updated_at: { type: Date, default: Date.now },
});

InventorySchema.index({ variant_id: 1, warehouse_id: 1 }, { unique: true });

export default mongoose.models.Inventory || mongoose.model<IInventory>('Inventory', InventorySchema);
