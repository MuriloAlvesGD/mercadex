import mongoose from "mongoose";
import validator from "validator";
import price from "./price";
import stock from "./stock";
import specification from "./specification";

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
        required: true,
        unique: true,
        upper: true,
        default: "fabricação própria"
    },
    description: {
        type: String,
        maxLength: 255,
        default: '',
        nullable: true,
    },
    images: [{type: String,
        validate: (value) => {
            return validator.isBase64(value);
        }
    }],
    price: price.schema,
    stock: stock.schema,
    specification: specification.schema,
})

module.exports = mongoose.model("Product", productSchema);