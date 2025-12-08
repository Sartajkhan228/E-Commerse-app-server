import { User } from "../models/user.js";
export const newUser = async (req, res) => {
    try {
        console.log("THIS IS API FOR CREATE USER");
        const { name, email, photo, gender, _id, dob } = req.body;
        if (!name?.trim() || !email?.trim() || !photo?.trim() || !gender?.trim() || !_id?.trim() || !dob) {
            return res.status(400).json({ success: false, message: "Please fill all details" });
        }
        let user = await User.findById(_id);
        if (user) {
            return res.status(200).json({ success: true, message: `welcome ${user.name}` });
        }
        user = await User.create({
            name, email, photo, gender, _id, dob
        });
        return res.status(200).json({ success: true, message: `welcome ${user.name}` });
    }
    catch (error) {
        console.error("Error creating user", error);
        res.status(400).json({ success: false, message: "Error creating user" });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(201).json({
            success: true,
            users
        });
    }
    catch (error) {
        console.error("Error gettting user", error);
        res.status(400).json({ success: false, message: "Error getting user" });
    }
};
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return res.status(400).json({ success: false, message: "Invalid id" });
        return res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        console.error("Error gettting user", error);
        res.status(400).json({ success: false, message: "Error getting user" });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                success: false, message: "Error getting single user"
            });
        }
        await user.deleteOne();
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting user", error);
        res.status(400).json({ success: false, message: "Error deleting user" });
    }
};
//# sourceMappingURL=user.js.map