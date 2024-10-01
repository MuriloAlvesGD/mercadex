import mongoose from "mongoose";
import price from "./price.js";
import stock from "./stock.js";
import specification from "./specification.js";

const productSchema = new mongoose.Schema({
    enterprise_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enterprise",
        required: true,
        nullable: false
    },
    name: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true,
        upper: true,
        nullable: false
    },
    brand: {
        type: String,
        maxLength: 100,
        upper: true,
        default: "fabricação própria"
    },
    description: {
        type: String,
        maxLength: 255,
        default: '',
        nullable: true,
    },
    images: {type:[String]},
    price: price.schema,
    stock: stock.schema,
    specification: specification.schema,
})

export default new  mongoose.model("Product", productSchema);