import { Product } from "../models/product.js";
import { rm } from "fs";
export const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;
        const photo = req.file;
        if (!photo) {
            return res.status(400).json({ success: false, message: "Please add photo" });
        }
        if (!name || !price || !stock || !category) {
            rm(photo.path, () => {
                console.log("Deleted");
            });
            return res.status(400).json({ success: false, message: "Invalid inputs" });
        }
        await Product.create({
            name,
            price,
            stock,
            category: category.toLowerCase(),
            photo: photo?.path
        });
        return res.status(201).json({ success: true, message: "Product created successfully" });
    }
    catch (error) {
        console.error("Error creating products", error);
        res.status(400).json({ success: false, message: "Error creating products" });
    }
};
export const getLatestProducts = async (req, res) => {
    try {
        const product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        return res.status(200).json({
            message: "success",
            product
        });
    }
    catch (error) {
        console.error("Error getting latest products", error);
        res.status(400).json({ success: false, message: "Error getting latest products" });
    }
};
export const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        return res.status(200).json({
            message: "success",
            categories
        });
    }
    catch (error) {
        console.error("Error getting categories", error);
        res.status(400).json({ success: false, message: "Error getting categories" });
    }
};
export const getAdminProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        return res.status(200).json({
            message: "success",
            product
        });
    }
    catch (error) {
        console.error("Error getting admin products", error);
        res.status(400).json({ success: false, message: "Error getting admin products" });
    }
};
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        console.log("PRODUCT GET", product);
        return res.status(200).json({
            message: "success",
            product
        });
    }
    catch (error) {
        console.error("Error getting single products", error);
        res.status(400).json({ success: false, message: "Error getting single products" });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, category } = req.body;
        const photo = req.file;
        const product = await Product.findById(id);
        console.log("PRODUCT UPDATE", product);
        if (!product)
            return res.status(404).json({ success: false, message: "No product found with this id" });
        if (photo) {
            rm(product.photo, () => {
                console.log("Old photo deleted");
            });
            product.photo = photo.path;
        }
        if (name)
            product.name = name;
        if (price)
            product.price = price;
        if (stock)
            product.stock = stock;
        if (category)
            product.category = category;
        await product.save();
        return res.status(201).json({
            success: true,
            messge: "Product updated successfully"
        });
    }
    catch (error) {
        console.error("Error updating single products", error);
        res.status(400).json({ success: false, message: "Error updating single products" });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        console.log("PRODUCT DELETED", product);
        if (!product)
            return res.status(401).json({
                success: false,
                message: "No product found"
            });
        rm(product.photo, () => {
            console.log("Product photo deleted");
        });
        await product.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting product", error);
        res.status(400).json({ success: false, message: "Error deleting product" });
    }
};
export const getSearchedProducts = async (req, res) => {
    try {
        const { search, price, category, sort } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = Number(process.env.PRODUT_PER_PAGE) || 8;
        const skip = (page - 1) * limit;
        const baseQuery = {};
        if (search)
            baseQuery.name = {
                $regex: search,
                $options: "i"
            };
        if (price)
            baseQuery.price = {
                $lte: Number()
            };
        if (category)
            baseQuery.category = category;
        const products = await Product.find(baseQuery).sort(sort && { price: sort === "asc" ? 1 : -1 }).limit(limit).skip(skip);
    }
    catch (error) {
        console.error("Error getting searched products", error);
        res.status(400).json({ success: false, message: "Error getting searched products" });
    }
};
//# sourceMappingURL=product.js.map