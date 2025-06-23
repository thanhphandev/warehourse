import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWarehouseAddress {
  street: string;
  city: string;
}

export interface IWarehouse extends Document {
  name: string;
  address: IWarehouseAddress;
  is_store: boolean;
  created_at: Date;
  updated_at: Date;
}

const WarehouseAddressSchema = new Schema<IWarehouseAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
});

const WarehouseSchema = new Schema<IWarehouse>({
  name: { type: String, required: true },
  address: { type: WarehouseAddressSchema, required: true },
  is_store: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Warehouse || mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);
