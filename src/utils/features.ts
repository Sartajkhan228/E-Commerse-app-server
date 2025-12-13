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


export const invalidateCache = async ({ product, order, admin, userId, productId }: InvalidateCacheProps) => {

    if (product) {
        const productKeys: string[] = [
            "latest-products",
            "categories",
            "products",

        ]
        // `product-${id}`
        // const product = await Product.find({}).select("_id");
        // product.forEach(element => {
        //     productKeys.push(`product=${element._id}`)
        // });

        if (typeof productId === "string")
            productKeys.push(`product=${productId}`)

        if (typeof productId === "object") {
            productId.forEach((i) => productKeys.push(`product-${i}`))
        }

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


export const calculatePercentage = (thisMonth: number, lastMonth: number) => {

    if (lastMonth === 0) {
        if (thisMonth === 0) return 0;
        return 100;
    }

    const percentage = (thisMonth / lastMonth) * 100
    console.log("PERCENTAGE", percentage)

    return percentage.toFixed(0);
};

interface myDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;

}

type funcProps = {
    length: number,
    docArr: myDocument[],
    today: Date,
    property?: "discount" | "total"
}

export const getBarsData = ({ length, docArr, today, property }: funcProps) => {
    const data: number[] = new Array(length).fill(0);

    docArr.forEach((item) => {
        const creationDate = item.createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth()) % 12;

        if (monthDiff < length) {
            data[length - monthDiff - 1] += property ? item[property]! : 1;
        }
    });

    return data;
}