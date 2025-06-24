import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUserAddress {
  address_id: Types.ObjectId;
  full_name: string;
  phone_number: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  is_default: boolean;
}

export interface IUser extends Document {
  full_name: string;
  email: {
    address: string;
    is_verified: boolean;
  };
  phone_number: {
    number: string;
    is_verified: boolean;
  };
  provider: 'credentials' | 'google' | 'github';
  password: string;
  role: 'customer' | 'admin' | 'manager';
  addresses: IUserAddress[];
  wishlist: Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const UserAddressSchema = new Schema<IUserAddress>({
  address_id: { type: Schema.Types.ObjectId, required: true },
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  street: { type: String, required: true },
  ward: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  is_default: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>({
  full_name: { type: String, required: true },
  email: {
    address: { type: String, required: true, unique: true },
    is_verified: { type: Boolean, default: false },
  },
  phone_number: {
    number: { type: String, required: false },
    is_verified: { type: Boolean, default: false },
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [UserAddressSchema],
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials',
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
