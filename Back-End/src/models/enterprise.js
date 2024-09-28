import mongoose from "mongoose";
import address from "./address.js";
import contact from "./contact.js";

const enterpriseSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
        upper: true,
        nullable: false
    },
    CNPJ: {
        type: String,
        maxLength: 14,
        required: true,
        unique: true,
        upper: true,
        nullable: false
    },
    profileImage: {
        type: String,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Functionary",
        required: true,
        unique: true,
        nullable: false,
        upper: true,
    },

    address: address.schema,
    contact: contact.schema,
})

export default mongoose.model("Enterprise", enterpriseSchema)