import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter name"] },
    photo: { type: String, required: [true, "Please set image"] },
    price: { type: Number, required: [true, "Please inter price"] },
    stock: { type: Number, required: [true, "Please inter stocks"] },
    category: { type: String, required: [true, "Please inter category"] }
}, {
    timestamps: true,
});
export const Product = mongoose.model("Product", schema);
//# sourceMappingURL=product.js.map