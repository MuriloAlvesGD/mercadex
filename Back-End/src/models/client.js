import mongoose from "mongoose";
import validator from "validator";
import address from "./address";
import contact from "./contact";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true,
        upper: true,
        nullable: false
    },
    CPF: {
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
    bornDate: {
        type: Date,
        required: true,
        nullable: false
    },
    address: address.schema,
    contact: contact.schema,
})

module.exports = mongoose.model("Client", clientSchema);