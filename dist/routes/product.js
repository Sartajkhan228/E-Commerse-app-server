import express from "express";
import { createProduct, getLatestProducts } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const productRouter = express.Router();
// /api/v1/product
productRouter.post("/all", singleUpload, createProduct);
productRouter.get("/latest", getLatestProducts);
export default productRouter;
//# sourceMappingURL=product.js.map