import mongoose from "mongoose";
import validator from "validator";
import address from "./address";
import contact from "./contact";
import assignment from "./assignment.js";

const functionarySchema = new mongoose.Schema({
    enterprise_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
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
    assignment: assignment.schema,
})

module.exports = mongoose.model("Functionary", functionarySchema);