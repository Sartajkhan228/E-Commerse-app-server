import type { Request, Response } from "express";
import type { NewOrderRequestBody } from "../types/type.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import { nodeCache } from "../app.js";


export const myOrders = async (req: Request, res: Response) => {

    try {
        const { id: user } = req.query;

        let orders = [];

        const key = `my-orders-${user}`

        if (nodeCache.has(key)) {
            orders = JSON.parse(nodeCache.get(key)!)
        } else {
            orders = await Order.find({ user })
            nodeCache.set(key, JSON.stringify(orders))
        }

        console.log("ORDERS", orders)

        return res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {
        console.error("Error getting my order", error)
        res.status(400).json({ success: false, message: "Error getting my order" })
    }
};


export const allOrders = async (req: Request, res: Response) => {

    try {
        let orders = [];

        const key = `all-orders`

        if (nodeCache.has(key)) {
            orders = JSON.parse(nodeCache.get(key)!)
        } else {
            orders = await Order.find().populate("user", "name dob")
            nodeCache.set(key, JSON.stringify(orders))
        }

        return res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {
        console.error("Error getting my order", error)
        res.status(400).json({ success: false, message: "Error getting my order" })
    }
};


export const getSingleOrder = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        let order;
        const key = `order-${id}`
        if (nodeCache.has(key)) {
            order = JSON.parse(nodeCache.get(key)!)
        } else {
            order = await Order.findById(id);
            if (!order) return res.status(404).json({ success: false, message: "Single order not found" });
            nodeCache.set(key, JSON.stringify(order))
        }

        return res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        console.error("Error getting single order", error)
        res.status(400).json({ success: false, message: "Error getting single order" })
    }
};



export const newOrder = async (req: Request<{}, {}, NewOrderRequestBody>, res: Response) => {

    try {

        const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total } = req.body;

        if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !shippingCharges || !discount || !total)
            return res.status(401).json({
                success: false,
                message: "All fields required"
            })

        const order = await Order.create({
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total
        });

        await reduceStock(orderItems);

        await invalidateCache({ product: true, order: true, admin: true, userId: user, productId: order.orderItems.map((i) => String(i.productId)) })

        return res.status(200).json({
            success: true,
            message: "Order placed successfully"
        })

    } catch (error) {
        console.error("Error pleacing order", error)
        res.status(400).json({ success: false, message: "Error pleacing order" })
    }

};



export const processOrder = async (req: Request, res: Response) => {

    try {

        const { id } = req.params

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Process order not found"
            })
        }

        switch (order.status) {
            case "Processing":
                order.status = "Shipped"
                break;
            case "Shipped":
                order.status = "Delivered"
                break;
            default:
                order.status = "Delivered"
                break;
        }

        await order.save()

        await invalidateCache({ product: false, order: true, admin: true, userId: order.user })

        return res.status(200).json({
            success: true,
            message: "Order processed successfully"
        })

    } catch (error) {
        console.error("Error pleacing order", error)
        res.status(400).json({ success: false, message: "Error pleacing order" })
    }

};


export const deleteOrder = async (req: Request, res: Response) => {

    try {

        const { id } = req.params

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Delete order not found"
            })
        }

        await order.deleteOne();

        await invalidateCache({ product: false, order: true, admin: true, userId: order.user })

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })

    } catch (error) {
        console.error("Error deleting order", error)
        res.status(400).json({ success: false, message: "Error deleting order" })
    }

};


