import type { Request, Response } from "express";
import { Coupon } from "../models/coupon.js";


export const newCoupon = async (req: Request, res: Response) => {

    const { coupon, amount } = req.body;

    if (!coupon || typeof coupon !== "string" || coupon.trim().length === 0 || !amount) {
        return res.status(400).json({
            success: false,
            message: "coupon code or amount not present"
        });
    }


    await Coupon.create({
        coupon, amount
    })

    return res.status(201).json({
        success: true,
        message: `Coupon ${coupon} created successfully`
    })



}