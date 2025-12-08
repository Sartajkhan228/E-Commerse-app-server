import express from "express";
import userRouter from "./routes/user.js";
import { mongoDB } from "./utils/features.js";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
dotenv.config();
const app = express();
app.use(express.json());
mongoDB();
app.get("/", (req, res) => {
    res.send(`<h1>Api routes are working</h1>`);
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost${port}`);
});
//# sourceMappingURL=app.js.map