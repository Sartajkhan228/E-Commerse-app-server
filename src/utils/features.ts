import mongoose from "mongoose";
import type { InvalidateCacheProps, OrderItemType } from "../types/type.js";
import { Product } from "../models/product.js";
import { nodeCache } from "../app.js";
import { Order } from "../models/order.js";

export const mongoDB = async (): Promise<void> => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI as string);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};


export const invalidateCache = async ({ product, order, admin, userId }: InvalidateCacheProps) => {

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

    if (order) {
        const orderKeys: string[] = ["all-orders", `my-orders-${userId}`]
        const order = await Order.find({}).select("_id");
        order.forEach((i) => {
            orderKeys.push(`order-${i._id}`)
        })

        nodeCache.del(orderKeys)
    }

}


export const reduceStock = async (orderItems: OrderItemType[]) => {

    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product) throw new Error("Product not found");

        product.stock -= order.quantity
        await product.save()
    }
}