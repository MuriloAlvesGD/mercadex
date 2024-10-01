import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
        type: String,
        required: true,
        default: "BRL"
    }
})

export default new mongoose.model("Price", priceSchema);