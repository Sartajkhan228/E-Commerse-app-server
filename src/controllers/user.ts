import type { Request, Response } from "express";
import { User } from "../models/user.js";
import type { NewUserRequesBody } from "../types/type.js";


export const newUser = async (req: Request<{}, {}, NewUserRequesBody>, res: Response) => {

    try {
        const { name, email, photo, gender, _id, dob } = req.body;

        if (!name?.trim() || !email?.trim() || !photo?.trim() || !gender?.trim() || !_id?.trim() || !dob) {
            return res.status(400).json({ success: false, message: "Please fill all details" });
        }


        let user = await User.findById(_id);

        if (user) {
            return res.status(200).json({ success: true, message: `welcome ${user.name}` })
        }


        user = await User.create({
            name, email, photo, gender, _id, dob
        })

        return res.status(200).json({ success: true, message: `welcome ${user.name}` })
    } catch (error) {
        console.error("Error creating user", error)
        res.status(400).json({ success: false, message: "Error creating user" })
    }
}



export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.find({})

        return res.status(201).json({
            success: true,
            users
        })


    } catch (error) {
        console.error("Error gettting user", error)
        res.status(400).json({ success: false, message: "Error getting user" })
    }
}


export const getUser = async (req: Request, res: Response) => {

    console.log("API FOR GETTING USER WITH ID IN SERVER CONTROLLER")
    try {
        console.log("API FOR GETTING USER WITH ID IN SERVER CONTROLLER")


        const { id } = req.params;
        console.log("ID", id)

        const user = await User.findById(id)
        console.log("USER", user)

        if (!user) return res.status(400).json({ success: false, message: "Invalid id" });

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.error("Error gettting user", error)
        res.status(400).json({ success: false, message: "Error getting user" })
    }
}


export const deleteUser = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success: false, message: "Error getting single user"
            })
        }

        await user.deleteOne()

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })


    } catch (error) {
        console.error("Error deleting user", error)
        res.status(400).json({ success: false, message: "Error deleting user" })
    }
}