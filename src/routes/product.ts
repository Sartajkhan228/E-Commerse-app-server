import express from "express"
import { createProduct, getLatestProducts, getCategories, getAdminProducts, getSingleProduct, updateProduct, deleteProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const productRouter = express.Router();

// /api/v1/product

productRouter.post("/all", singleUpload, createProduct);
productRouter.get("/latest", getLatestProducts);
productRouter.get("/categories", getCategories);
productRouter.get("/admin-products", getAdminProducts);

productRouter.route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, deleteProduct)

export default productRouter;