import type { Request, Response } from "express";
import type { BaseQuery, NewProductRequestBody, SearchRequesQuery } from "../types/type.js";
import { Product } from "../models/product.js";
import { rm } from "fs";
import { nodeCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";



export const getLatestProducts = async (req: Request, res: Response) => {

    try {
        let product = [];

        if (nodeCache.has("latest-products")) {
            product = JSON.parse(nodeCache.get("latest-products")!)

        } else {

            product = await Product.find({}).sort({ createdAt: -1 }).limit(5);

            nodeCache.set("latest-products", JSON.stringify(product));

        }

        return res.status(200).json({
            message: "success",
            product
        })

    } catch (error) {
        console.error("Error getting latest products", error)
        res.status(400).json({ success: false, message: "Error getting latest products" })
    }
}


export const getCategories = async (req: Request, res: Response) => {

    try {

        let categories = [];

        if (nodeCache.has("categories")) {
            categories = JSON.parse(nodeCache.get("categories")!)
        } else {
            categories = await Product.distinct("category");
            nodeCache.set("categories", JSON.stringify(categories))
        }

        return res.status(200).json({
            message: "success",
            categories
        })

    } catch (error) {
        console.error("Error getting categories", error)
        res.status(400).json({ success: false, message: "Error getting categories" })
    }
}


export const getAdminProducts = async (req: Request, res: Response) => {

    try {

        let product = [];

        if (nodeCache.has("products")) {
            product = JSON.parse(nodeCache.get("products")!)
        } else {
            product = await Product.find({});
            nodeCache.set("products", JSON.stringify(product))
        }

        return res.status(200).json({
            message: "success",
            product
        })

    } catch (error) {
        console.error("Error getting admin products", error)
        res.status(400).json({ success: false, message: "Error getting admin products" })
    }
}


export const getSingleProduct = async (req: Request, res: Response) => {

    try {

        let product = []
        const id = req.params.id

        if (nodeCache.has(`product-${id}`)) {
            product = JSON.parse(nodeCache.get(`product-${id}`)!);
        } else {
            product = await Product.findById(id);

            if (!product) return res.status(404).json({ success: false, message: "Single product not found" });

            nodeCache.set(`product-${id}`, JSON.stringify(product));
        }

        return res.status(200).json({
            message: "success",
            product
        })

    } catch (error) {
        console.error("Error getting single product", error)
        res.status(400).json({ success: false, message: "Error getting single product" })
    }
}


export const createProduct = async (req: Request<{}, {}, NewProductRequestBody>, res: Response) => {

    try {

        const { name, price, stock, category } = req.body;
        const photo = req.file;

        if (!photo) {
            return res.status(400).json({ success: false, message: "Please add photo" })
        }

        if (!name || !price || !stock || !category) {

            rm(photo.path, () => {
                console.log("Deleted")
            });

            return res.status(400).json({ success: false, message: "Invalid inputs" })
        }

        await Product.create({
            name,
            price,
            stock,
            category: category.toLowerCase(),
            photo: photo?.path
        })

        await invalidateCache({ product: true, admin: true })

        return res.status(201).json({ success: true, message: "Product created successfully" })


    } catch (error) {
        console.error("Error creating products", error)
        res.status(400).json({ success: false, message: "Error creating products" })
    }
}


export const updateProduct = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        const { name, price, stock, category } = req.body;
        const photo = req.file;

        const product = await Product.findById(id);

        console.log("PRODUCT UPDATE", product)


        if (!product) return res.status(404).json({ success: false, message: "No product found with this id" });

        if (photo) {
            rm(product.photo!, () => {
                console.log("Old photo deleted")
            });
            product.photo = photo.path;
        }

        if (name) product.name = name;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (category) product.category = category;

        await product.save();

        await invalidateCache({ product: true, admin: true })

        return res.status(201).json({
            success: true,
            messge: "Product updated successfully"
        })

    } catch (error) {
        console.error("Error updating single products", error)
        res.status(400).json({ success: false, message: "Error updating single products" })
    }
}


export const deleteProduct = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        console.log("PRODUCT DELETED", product)


        if (!product) return res.status(401).json({
            success: false,
            message: "No product found"
        });

        rm(product.photo!, () => {
            console.log("Product photo deleted");
        })

        await product.deleteOne();

        await invalidateCache({ product: true, admin: true })

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })


    } catch (error) {
        console.error("Error deleting product", error)
        res.status(400).json({ success: false, message: "Error deleting product" })
    }
}


export const getSearchedProducts = async (req: Request<{}, {}, {}, SearchRequesQuery>, res: Response) => {
    try {
        const { search, price, category, sort } = req.query;
        const page = Number(req.query.page) || 1
        const limit = Number(process.env.PRODUT_PER_PAGE) || 8
        const skip = (page - 1) * limit


        const baseQuery: BaseQuery = {}

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
            baseQuery.category = category

        const productsPromise = Product.find(baseQuery).sort(sort && { price: sort === "asc" ? 1 : -1 }).limit(limit).skip(skip);

        const [products, filteredOnlyProducts] = await Promise.all([
            productsPromise,
            Product.find(baseQuery)
        ])

        const totalPages = Math.ceil(filteredOnlyProducts.length / limit)

        return res.status(200).json({
            success: true,
            products,
            totalPages
        })

    } catch (error) {
        console.error("Error getting searched products", error)
        res.status(400).json({ success: false, message: "Error getting searched products" })
    }
}