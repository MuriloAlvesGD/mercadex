import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    qtd: {
        type: Number,
        required: true,
        default: 0
    },
    avaiable: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default new mongoose.model("Stock", stockSchema);