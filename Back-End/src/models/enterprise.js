import mongoose from "mongoose";
import validator from "validator";
import address from "./address";
import contact from "./contact";

const enterpriseSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true,
        upper: true,
        nullable: false
    },
    CNPJ: {
        type: String,
        required: true,
        unique: true,
        upper: true,
        nullable: false
    },
    profileImage: {
        type: String,
        validate: (value) => {
            return validator.isBase64(value);
        }
    },
    address: address.schema,
    contact: contact.schema,
})

module.exports = mongoose.model("Enterprise", enterpriseSchema)