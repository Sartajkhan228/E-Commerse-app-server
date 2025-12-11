import type { Request, Response } from "express";
import { nodeCache } from "../app.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { calculatePercentage } from "../utils/features.js";


export const getDashboardStates = async (req: Request, res: Response) => {

    try {

        let stats;

        if (nodeCache.has("admin-stats")) {
            stats = JSON.parse(nodeCache.get("admin-stats")!)
        } else {

            const today = new Date();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

            const thisMonth = {
                start: new Date(today.getFullYear(), today.getMonth(), 1),
                end: today
            }
            console.log("THISMONTH", thisMonth)

            const lastMonth = {
                start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
                end: new Date(today.getFullYear(), today.getMonth(), 0)
            }

            console.log("LASTMONTH",)

            const thisMonthProductsPromise = Product.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                }
            })

            const lastMonthProductsPromise = Product.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                }
            });


            const thisMonthUserPromise = User.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                }
            })

            const lastMonthUserPromise = User.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                }
            });


            const thisMonthOrderPromise = Order.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                }
            })

            const lastMonthOrderPromise = Order.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                }
            })

            const lastSixMonthsOrdersPromise = Order.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today
                }
            })

            const [thisMonthOrders,
                thisMonthProducts,
                thisMonthUsers,
                lastMonthOrders,
                lastMonthProducts,
                lastMonthUsers,
                productCount,
                userCount,
                allorders,
                lastSixMonthsOrders
            ] = await Promise.all([
                thisMonthOrderPromise,
                thisMonthProductsPromise,
                thisMonthUserPromise,
                lastMonthOrderPromise,
                lastMonthProductsPromise,
                lastMonthUserPromise,
                Product.countDocuments(),
                User.countDocuments(),
                Order.find({}).select("total"),
                lastSixMonthsOrdersPromise
            ])

            const thisMonthRevenue = thisMonthOrders.reduce(
                (total, order) => total + (order.total || 0),
                0);

            const lastMonthRevenue = lastMonthOrders.reduce(
                (total, order) => total + (order.total || 0),
                0)

            const changePercentage = {
                revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
                product: calculatePercentage(
                    thisMonthProducts.length,
                    lastMonthProducts.length
                ),
                order: calculatePercentage(
                    thisMonthOrders.length,
                    lastMonthOrders.length
                ),
                user: calculatePercentage(
                    thisMonthUsers.length,
                    lastMonthUsers.length
                )
            }

            const revenue = allorders.reduce(
                (total, order) => total + (order.total || 0), 0
            )

            const count = {
                revenue,
                product: productCount,
                user: userCount,
                order: allorders.length
            }

            lastSixMonthsOrders.forEach((order) => {

            })

            stats = {
                changePercentage,
                count
            }
        }

        res.status(200).json({
            success: true,
            stats

        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            message: "Error getting dashboard stats"
        })
    }
}