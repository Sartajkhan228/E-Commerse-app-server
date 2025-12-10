import express from "express";
import { newOrder, myOrders, allOrders, getSingleOrder, processOrder, deleteOrder } from "../controllers/oreder.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
const orderRouter = express.Router();
// /api/v1/order
orderRouter.post("/new", singleUpload, newOrder);
orderRouter.get("/my", myOrders);
orderRouter.get("/all", adminOnly, allOrders);
orderRouter.route("/:id").get(getSingleOrder).put(adminOnly, processOrder).delete(adminOnly, deleteOrder);
export default orderRouter;
//# sourceMappingURL=order.js.map