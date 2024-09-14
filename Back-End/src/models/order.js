import mongoose from 'mongoose';
import * as moongose from "mongoose";
import address from "./address";
import price from "./productModels/price"

const orderSchema = new mongoose.Schema({
    client_id: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
        nullable: false
    },
    enterprise_id: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: true,
        nullable: false
    },
    address: address.schema,
    price: price.schema,
    products: [{
        product_id: {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            nullable: false
        },
        qtd: {
            type: Number,
            required: true,
            default: 0
        }
    }]
})

module.exports = moongose.model("Order", orderSchema);