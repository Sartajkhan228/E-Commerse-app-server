import express from "express";
import { newCoupon, applyDiscount, allCoupons, deleteCoupon } from "../controllers/payment.js";
import { adminOnly } from "../middlewares/auth.js";
const paymentRouter = express.Router();
// "/api/v1/payment"
paymentRouter.get("/discount", applyDiscount);
paymentRouter.post("/coupon/new", adminOnly, newCoupon);
paymentRouter.get("/coupon/all", adminOnly, allCoupons);
paymentRouter.delete("/coupon/:id", adminOnly, deleteCoupon);
export default paymentRouter;
//# sourceMappingURL=payment.js.map