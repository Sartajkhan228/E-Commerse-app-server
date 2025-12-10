import mongoose from "mongoose";
import type { InvalidateCacheProps } from "../types/type.js";
import { Product } from "../models/product.js";
import { nodeCache } from "../app.js";

export const mongoDB = async (): Promise<void> => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI as string);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};


export const invalidateCache = async ({ product, order, admin }: InvalidateCacheProps) => {

    if (product) {
        const productKeys: string[] = [
            "latest-products",
            "categories",
            "products",
        ]
        // `product-${id}`
        const product = await Product.find({}).select("_id");
        product.forEach(element => {
            productKeys.push(`product=${element._id}`)
        });

        nodeCache.del(productKeys);
    };




}
