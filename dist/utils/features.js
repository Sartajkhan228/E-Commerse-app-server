import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { nodeCache } from "../app.js";
export const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};
export const invalidateCache = async ({ product, order, admin }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "products",
        ];
        // `product-${id}`
        const product = await Product.find({}).select("_id");
        product.forEach(element => {
            productKeys.push(`product=${element._id}`);
        });
        nodeCache.del(productKeys);
    }
    ;
};
//# sourceMappingURL=features.js.map