import express from "express"
import { newUser } from "../controllers/user.js";


const userRouter = express.Router();

userRouter.get("/new", newUser)




export default userRouter;