import mongoose from "mongoose";
import validator from "validator";

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

module.exports = mongoose.model("Price", priceSchema);