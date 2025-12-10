import express from "express";
import { newOrder, myOrders, allOrders } from "../controllers/oreder.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
const orderRouter = express.Router();
// /api/v1/order
orderRouter.post("/new", singleUpload, newOrder);
orderRouter.get("/my", myOrders);
orderRouter.get("/all", allOrders);
export default orderRouter;
//# sourceMappingURL=order.js.map