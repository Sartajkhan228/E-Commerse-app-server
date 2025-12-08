import express from "express";
import { newUser, getAllUsers, getUser, deleteUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const userRouter = express.Router();
// /api/v1/user
userRouter.post("/new", newUser);
userRouter.get("/users", getAllUsers);
userRouter.route("/:id").get(adminOnly, getUser).delete(adminOnly, deleteUser);
export default userRouter;
//# sourceMappingURL=user.js.map