import type { Request, Response } from "express";
import type { NewProductRequestBody } from "../types/type.js";
import { Product } from "../models/product.js";
import { rm } from "fs";



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

        return res.status(201).json({ success: true, message: "Product created successfully" })


    } catch (error) {
        console.error("Error creating products", error)
        res.status(400).json({ success: false, message: "Error creating products" })
    }
}



export const getLatestProducts = async (req: Request, res: Response) => {

    try {

        const product = await Product.find({}).sort({ createdAt: -1 }).limit(5);

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

        const categories = await Product.distinct("category");

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

        const product = await Product.find({});

        return res.status(200).json({
            message: "success",
            product
        })

    } catch (error) {
        console.error("Error getting admin products", error)
        res.status(400).json({ success: false, message: "Error getting admin products" })
    }
}