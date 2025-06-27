import mongoose, { Schema, Document } from 'mongoose';

export interface IManufacturer extends Document {
  name: string;
  slug: string;
  logo?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

const ManufacturerSchema = new Schema<IManufacturer>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    website: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  }
);

export default mongoose.models.Manufacturer ||
  mongoose.model<IManufacturer>('Manufacturer', ManufacturerSchema);
