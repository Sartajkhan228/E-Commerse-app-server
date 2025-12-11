import express from "express";
import userRouter from "./routes/user.js";
import { mongoDB } from "./utils/features.js";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
import NodeCache from "node-cache";
import orderRouter from "./routes/order.js";
import morgan from "morgan";
import paymentRouter from "./routes/payment.js";
import dashboardRoutes from "./routes/stats.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
mongoDB();
export const nodeCache = new NodeCache();
app.get("/", (req, res) => {
    res.send(`<h1>Api routes are working</h1>`);
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/dashboard/stats", dashboardRoutes);
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map