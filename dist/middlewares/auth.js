import { User } from "../models/user.js";
export const adminOnly = async (req, res, next) => {
    try {
        // const { id } = req.query;
        // if (!id) return res.status(401).json({ success: false, message: "Unauthorized user" });
        // const user = await User.findById(id);
        const user = req.user;
        if (!user)
            return res.status(400).json({ success: false, message: "No user found with this id" });
        if (user.role !== "admin") {
            return res.status(400).json({ success: false, message: "Admin only" });
        }
        next();
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Authenticaion error" });
    }
};
//# sourceMappingURL=auth.js.map