import mongoose from "mongoose";
const schema = new mongoose.Schema({
    coupon: {
        type: String,
        required: [true, "Please inter the coupon code"],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, "Please inter discount amount"],
    }
});
export const Coupon = mongoose.model("Coupon", schema);
//# sourceMappingURL=coupon.js.map