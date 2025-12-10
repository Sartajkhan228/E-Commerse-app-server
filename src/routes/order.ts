

import express from "express"
import { newOrder } from "../controllers/oreder.js";

const orderRouter = express.Router();

// /api/v1/order
orderRouter.post("/new", newOrder);



export default orderRouter;

