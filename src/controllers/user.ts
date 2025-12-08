import { User } from "../models/user.js";
import type { NewUserRequesBody } from "../types/type.js";


export const newUser = async (req: Request<{}, {}, NewUserRequesBody>, res: Response) => {

    try {
        console.log("THIS IS API FOR CREATE USER")
        const { name, email, photo, gender, _id, dob } = req.body;

        const user = await User.create({
            name, email, photo, gender, _id, dob
        })

        return res.status(200).json({ success: true, message: `welcome ${user.name}` })
    } catch (error) {
        console.error("Error creating user", error)
        res.status(400)
    }
}