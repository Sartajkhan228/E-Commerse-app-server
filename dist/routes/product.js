import express from "express";
import { createProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const productRouter = express.Router();
productRouter.get("/all", singleUpload, createProduct);
export default productRouter;
//# sourceMappingURL=product.js.map