import { nodeCache } from "../app.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { calculatePercentage, getBarsData } from "../utils/features.js";
export const getDashboardStates = async (req, res) => {
    try {
        let stats;
        const key = "admin-stats";
        if (nodeCache.has(key)) {
            stats = JSON.parse(nodeCache.get(key));
        }
        else {
            const today = new Date();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const thisMonth = {
                start: new Date(today.getFullYear(), today.getMonth(), 1),
                end: today
            };
            console.log("THISMONTH", thisMonth);
            const lastMonth = {
                start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
                end: new Date(today.getFullYear(), today.getMonth(), 0)
            };
            console.log("LASTMONTH");
            const thisMonthProductsPromise = Product.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                }
            });
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
            });
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
            });
            const lastMonthOrderPromise = Order.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                }
            });
            const lastSixMonthsOrdersPromise = Order.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today
                }
            });
            const latestTransactionsPromise = Order.find({})
                .select(["orderItems", "discount", "total", "status"]).limit(4);
            const [thisMonthOrders, thisMonthProducts, thisMonthUsers, lastMonthOrders, lastMonthProducts, lastMonthUsers, productCount, usersCount, allorders, lastSixMonthsOrders, categories, femalesCount, latestTransaction] = await Promise.all([
                thisMonthOrderPromise,
                thisMonthProductsPromise,
                thisMonthUserPromise,
                lastMonthOrderPromise,
                lastMonthProductsPromise,
                lastMonthUserPromise,
                Product.countDocuments(),
                User.countDocuments(),
                Order.find({}).select("total"),
                lastSixMonthsOrdersPromise,
                Product.distinct("category"),
                User.countDocuments({ gender: "female" }),
                latestTransactionsPromise
            ]);
            const thisMonthRevenue = thisMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
            const lastMonthRevenue = lastMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
            const changePercentage = {
                revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
                product: calculatePercentage(thisMonthProducts.length, lastMonthProducts.length),
                order: calculatePercentage(thisMonthOrders.length, lastMonthOrders.length),
                user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length)
            };
            const revenue = allorders.reduce((total, order) => total + (order.total || 0), 0);
            const count = {
                revenue,
                product: productCount,
                user: usersCount,
                order: allorders.length
            };
            const orderMonthCounts = new Array(6).fill(0);
            const orderMonthlyRevenue = new Array(6).fill(0);
            lastSixMonthsOrders.forEach((order) => {
                const creationDate = order.createdAt;
                const monthDiff = (today.getMonth() - creationDate.getMonth()) % 12;
                if (monthDiff < 6) {
                    orderMonthCounts[6 - monthDiff - 1] += 1;
                    orderMonthlyRevenue[6 - monthDiff - 1] += order.total;
                }
            });
            const categoriesCountPromise = categories.map((category) => Product.countDocuments({ category }));
            const categoriesCount = await Promise.all(categoriesCountPromise);
            const categoryCount = [];
            categories.forEach((category, index) => {
                categoryCount.push({
                    [category]: Math.round(categoriesCount[index] / productCount * 100)
                });
            });
            const usersRatio = {
                male: usersCount - femalesCount,
                female: femalesCount
            };
            const modifiedLatestTransactions = latestTransaction.map((item) => ({
                _id: item._id,
                discount: item.discount,
                amount: item.total,
                quantity: item.orderItems.length,
                status: item.status
            }));
            stats = {
                categoryCount,
                changePercentage,
                count,
                chart: {
                    order: orderMonthCounts,
                    revenue: orderMonthlyRevenue
                },
                usersRatio,
                latestTransaction: modifiedLatestTransactions
            };
            nodeCache.set(key, JSON.stringify(stats));
        }
        res.status(200).json({
            success: true,
            stats
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error getting dashboard stats"
        });
    }
};
export const getDashboardPieChart = async (req, res) => {
    try {
        let pieChart;
        const key = "admin-pie-charts";
        if (nodeCache.has(key)) {
            pieChart = JSON.parse(nodeCache.get(key));
        }
        else {
            const allOrdersPromise = Order.find({}).select(["total", "discount", "subtotal", "tax", "shippingCharges"]);
            const [processingOrder, shippedOrder, deliveredOrder, categories, productCount, outOfStockProduct, allOrders, allUsers, adminUsers, customerUsers] = await Promise.all([
                Order.countDocuments({ status: "Processing" }),
                Order.countDocuments({ status: "Shipped" }),
                Order.countDocuments({ status: "Delivered" }),
                Product.distinct("category"),
                Product.countDocuments(),
                Product.countDocuments({ stock: 0 }),
                allOrdersPromise,
                User.find({}).select(["dob"]),
                User.countDocuments({ role: "admin" }),
                User.countDocuments({ role: "user" })
            ]);
            // console.log("ALLUSERS", allUsers[0]?.dob.toDateString())
            const orderFullFillment = {
                processing: processingOrder,
                shipped: shippedOrder,
                deliverd: deliveredOrder
            };
            const categoriesCountPromise = categories.map((category) => Product.countDocuments({ category }));
            const categoriesCount = await Promise.all(categoriesCountPromise);
            const categoryCount = [];
            categories.map((category, index) => {
                categoryCount.push({
                    [category]: Math.round(categoriesCount[index] / productCount * 100)
                });
            });
            const stockAvailability = {
                inStock: productCount - outOfStockProduct,
                outOfStock: outOfStockProduct
            };
            // const arr = [56, 77, 66]
            // const result = arr.reduce((i, index) => (i + index), 0)
            // console.log("RESULT", result)
            const grossIncome = allOrders.reduce((prev, order) => prev + (order.total || 0), 0);
            const discount = allOrders.reduce((prev, order) => prev + (order.discount || 0), 0);
            const productionCost = allOrders.reduce((prev, order) => prev + (order.shippingCharges || 0), 0);
            const burnt = allOrders.reduce((prev, order) => prev + (order.tax), 0);
            const marketingCostPercentage = process.env.MARKETING_COST || 30;
            const marketingCost = Math.round((grossIncome * marketingCostPercentage) / 100);
            const netMargin = grossIncome - discount - productionCost - burnt - marketingCost;
            const revenueDistribution = {
                netMargin,
                discount,
                productionCost,
                burnt,
                marketingCost,
                grossIncome
            };
            const userAgeGroup = {
                teen: allUsers.filter((i) => i.age < 20).length,
                adult: allUsers.filter((i) => i.age >= 20 && i.age <= 40).length,
                old: allUsers.filter((i) => i.age > 40).length
            };
            const adminCustomer = {
                admin: adminUsers,
                customer: customerUsers
            };
            // sending data to frontend
            pieChart = {
                orderFullFillment,
                categoryCount,
                stockAvailability,
                revenueDistribution,
                userAgeGroup,
                adminCustomer
            };
            nodeCache.set(key, JSON.stringify(pieChart));
        }
        return res.status(200).json({
            success: true,
            pieChart
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error getting dashboard pie chart"
        });
    }
};
export const getDashboardBars = async (req, res) => {
    try {
        let bars;
        const key = "admin-bars";
        if (nodeCache.has(key)) {
            bars = JSON.parse(nodeCache.get(key));
        }
        else {
            const today = new Date();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const twelveMonthsAgo = new Date();
            twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
            const lastSixMonthsProductPromise = Product.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today
                }
            }).select("createdAt");
            const lastSixMonthsUsersPromise = User.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today
                }
            }).select("createdAt");
            const lastTwelveMonthesOrdersPromise = Order.find({
                createdAt: {
                    $gte: twelveMonthsAgo,
                    $lte: today
                }
            }).select("createdAt");
            const [sixMonthProducts, sixMonthUsers, twelveMonthsOrders] = await Promise.all([
                lastSixMonthsProductPromise,
                lastSixMonthsUsersPromise,
                lastTwelveMonthesOrdersPromise
            ]);
            const productCounts = getBarsData({ length: 6, today, docArr: sixMonthProducts });
            const userCounts = getBarsData({ length: 6, today, docArr: sixMonthUsers });
            const orderCounts = getBarsData({ length: 12, today, docArr: twelveMonthsOrders });
            bars = {
                users: userCounts,
                products: productCounts,
                orders: orderCounts
            };
            nodeCache.set(key, JSON.stringify(bars));
        }
        return res.status(200).json({
            success: false,
            bars
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error getting dashboard bars"
        });
    }
};
export const getDashboardLine = async (req, res) => {
    try {
        let line;
        const key = "line-chart";
        if (nodeCache.has(key)) {
            line = JSON.parse(nodeCache.get(key));
        }
        else {
            nodeCache.set(key, JSON.stringify(line));
        }
        return res.status(200).json({
            success: true,
            line
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error getting dashboard bars"
        });
    }
};
//# sourceMappingURL=stats.js.map