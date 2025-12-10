import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import { nodeCache } from "../app.js";
export const newOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total } = req.body;
        if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !shippingCharges || !discount || !total)
            return res.status(401).json({
                success: false,
                message: "All fields required"
            });
        await Order.create({
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
        await invalidateCache({ product: true, order: true, admin: true });
        return res.status(200).json({
            success: true,
            message: "Order placed successfully"
        });
    }
    catch (error) {
        console.error("Error pleacing order", error);
        res.status(400).json({ success: false, message: "Error pleacing order" });
    }
};
export const myOrders = async (req, res) => {
    try {
        const { id: user } = req.query;
        let orders = [];
        const key = `my-orders-${user}`;
        if (nodeCache.has(key)) {
            orders = JSON.parse(nodeCache.get(key));
        }
        else {
            orders = await Order.find({ user });
            nodeCache.set(key, JSON.stringify(orders));
        }
        console.log("ORDERS", orders);
        return res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
        console.error("Error getting my order", error);
        res.status(400).json({ success: false, message: "Error getting my order" });
    }
};
export const allOrders = async (req, res) => {
    try {
        let orders = [];
        const key = `all-orders`;
        if (nodeCache.has(key)) {
            orders = JSON.parse(nodeCache.get(key));
        }
        else {
            orders = await Order.find().populate("user", "name");
            nodeCache.set(key, JSON.stringify(orders));
        }
        console.log("ALL ORDERS", orders);
        return res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
        console.error("Error getting my order", error);
        res.status(400).json({ success: false, message: "Error getting my order" });
    }
};
//# sourceMappingURL=oreder.js.map