import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { id } = req.query;

        if (!id) return res.status(401).json({ success: false, message: "Unauthorized user" });

        const user = await User.findById(id);

        // const user = req.user;

        if (!user) return res.status(400).json({ success: false, message: "No user found with this id" });

        if (user.role !== "admin") {
            return res.status(400).json({ success: false, message: "Admin only" });
        }

        next()

    } catch (error) {

        res.status(400).json({ success: false, message: "Authenticaion error" });

    }
}