import { Product } from "../models/product.js";
export const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;
        const photo = req.file;
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
//# sourceMappingURL=product.js.map