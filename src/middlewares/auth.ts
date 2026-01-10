import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {

    console.log("THIS IS ADMIN 1")

    try {
        console.log("THIS IS ADMIN 2")

        const { id } = req.params;
        console.log("ID", id)

        if (!id) return res.status(401).json({ success: false, message: "Unauthorized user" });

        const user = await User.findById(id);



        // const user = req.user;

        // if (!user) return res.status(400).json({ success: false, message: "No user found with this id" });

        // if (user.role !== "admin") {
        //     return res.status(400).json({ success: false, message: "Admin only" });
        // }

        next()

    } catch (error) {
        console.log("THIS IS ADMIN 3")

        res.status(400).json({ success: false, message: "Authenticaion error" });
        console.log("ERROR FROM ADMIN API", error)

    }
}