import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    oldPrice: {
        type: Number,
        nullable: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    hasDiscount: {
        type: Boolean,
        required: true,
        default: false
    },
    currency: {
        type: String,
        required: true,
        default: "BRL"
    }
})

export default new mongoose.model("Price", priceSchema);