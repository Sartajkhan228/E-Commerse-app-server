import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { nodeCache } from "../app.js";
import { Order } from "../models/order.js";
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
export const invalidateCache = async ({ product, order, admin, userId }) => {
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
    if (order) {
        const orderKeys = ["all-orders", `my-orders-${userId}`];
        const order = await Order.find({}).select("_id");
        order.forEach((i) => {
            orderKeys.push(`order-${i._id}`);
        });
        nodeCache.del(orderKeys);
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product not found");
        product.stock -= order.quantity;
        await product.save();
    }
};
//# sourceMappingURL=features.js.map