import type { Request, Response } from "express";
import type { NewProductRequestBody } from "../types/type.js";
import { Product } from "../models/product.js";

export const createProduct = async (req: Request<{}, {}, NewProductRequestBody>, res: Response) => {

    try {

        const { name, price, stock, category } = req.body;
        const photo = req.file;

        await Product.create({
            name,
            price,
            stock,
            category: category.toLowerCase(),
            photo: photo?.path
        })



    } catch (error) {
        console.error("Error creating products", error)
        res.status(400).json({ success: false, message: "Error creating products" })
    }
}