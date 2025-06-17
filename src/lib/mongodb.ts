'use server';

import mongoose from 'mongoose';
import { env } from '@/env';

const MONGO_URI = env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('❌ MONGO_URI is not defined in environment variables.');
}

// Cache kết nối MongoDB trong biến global để tránh tạo lại kết nối
const globalWithMongoose = global as typeof global & {
    mongoose?: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
};

// Đảm bảo biến global được khởi tạo
if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

export const connectDb = async () => {
    try {
        // Đảm bảo mongoose luôn tồn tại trước khi truy cập thuộc tính
        if (globalWithMongoose.mongoose!.conn) {
            return globalWithMongoose.mongoose!.conn;
        }

        globalWithMongoose.mongoose!.promise =
            globalWithMongoose.mongoose!.promise ||
            mongoose
                .connect(MONGO_URI)
                .then((mongooseInstance) => mongooseInstance.connection);

        globalWithMongoose.mongoose!.conn = await globalWithMongoose.mongoose!.promise;
        return globalWithMongoose.mongoose!.conn;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
    }
};


export async function getMongoDbClient() {
    await connectDb();
    return globalWithMongoose.mongoose!.conn!.getClient();
}