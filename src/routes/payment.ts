import express from "express"
import { newCoupon } from "../controllers/payment.js";


const paymentRouter = express.Router();

paymentRouter.post("/coupon/new", newCoupon)

export default paymentRouter;