import mongoose from "mongoose";
import validator from "validator";

const stockSchema = new mongoose.Schema({
    qtd: {
        type: Number,
        required: true,
        default: 0
    },
    avaiable: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model("Stock", stockSchema);