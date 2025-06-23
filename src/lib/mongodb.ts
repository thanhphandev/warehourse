'use server';

import mongoose from 'mongoose';
import { env } from '@/env';

const MONGO_URI = env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI is not defined in environment variables.');
}

const globalWithMongoose = global as typeof global & {
  mongoose?: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
};

// ✅ Đảm bảo mongoose luôn tồn tại
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDb(): Promise<mongoose.Connection> {
  const cache = globalWithMongoose.mongoose!; // 👈 đảm bảo đã được gán ở trên

  if (cache.conn) {
    console.log('✅ Using cached MongoDB connection');
    return cache.conn;
  }

  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
    };

    cache.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log('🚀 New MongoDB connection established');
        return mongooseInstance.connection;
      });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }

  return cache.conn;
}

export async function getMongoDbClient() {
  const conn = await connectDb();
  return conn.getClient();
}
