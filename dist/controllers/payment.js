import { Coupon } from "../models/coupon.js";
export const newCoupon = async (req, res) => {
    try {
        const { coupon, amount } = req.body;
        if (!coupon || typeof coupon !== "string" || coupon.trim().length === 0 || !amount) {
            return res.status(400).json({
                success: false,
                message: "coupon code or amount not present"
            });
        }
        await Coupon.create({
            coupon,
            amount
        });
        return res.status(201).json({
            success: true,
            message: `Coupon ${coupon} created successfully`
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error creating new coupon code"
        });
    }
};
export const applyDiscount = async (req, res) => {
    try {
        const { coupon } = req.query;
        const discount = await Coupon.findOne({ coupon });
        if (!discount) {
            return res.status(400).json({
                success: false,
                message: "Invalid coupon code"
            });
        }
        return res.status(201).json({
            success: true,
            discount: discount.amount
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error getting discount"
        });
    }
};
export const allCoupons = async (req, res) => {
    try {
        const discounts = await Coupon.find({});
        return res.status(200).json({
            success: false,
            discounts
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error getting all coupons"
        });
    }
};
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const couponId = await Coupon.findByIdAndDelete(id);
        if (!couponId)
            return res.status(401).json({
                success: false,
                message: "Invalid id"
            });
        return res.status(200).json({
            success: false,
            message: "Coupon deleted successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error deleting coupons"
        });
    }
};
//# sourceMappingURL=payment.js.map