import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrderItem {
  variant_id: Types.ObjectId;
  sku: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  price: number;
}

export interface IOrderStatusHistory {
  status: string;
  timestamp: Date;
}

export interface IOrderPayment {
  method: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface IOrder extends Document {
  order_number: string;
  user_id: Types.ObjectId;
  items: IOrderItem[];
  shipping_address: any;
  sub_total: number;
  shipping_fee: number;
  discount_amount: number;
  total_amount: number;
  payment: IOrderPayment;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  status_history: IOrderStatusHistory[];
  created_at: Date;
  updated_at: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  variant_id: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  sku: { type: String, required: true },
  product_name: { type: String, required: true },
  variant_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderStatusHistorySchema = new Schema<IOrderStatusHistory>({
  status: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const OrderPaymentSchema = new Schema<IOrderPayment>({
  method: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
});

const OrderSchema = new Schema<IOrder>({
  order_number: { type: String, required: true, unique: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  shipping_address: { type: Schema.Types.Mixed, required: true },
  sub_total: { type: Number, required: true },
  shipping_fee: { type: Number, required: true },
  discount_amount: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  payment: { type: OrderPaymentSchema, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], required: true },
  status_history: [OrderStatusHistorySchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
