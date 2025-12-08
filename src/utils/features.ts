import mongoose from "mongoose";

export const mongoDB = async (): Promise<void> => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI as string);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};
