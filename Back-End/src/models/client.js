import mongoose from "mongoose";
import bcrypt from "bcrypt"
import address from "./address.js";
import contact from "./contact.js";

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
    },
    bornDate: {
        type: Date,
        required: true,
        nullable: false
    },
    address: address.schema,
    contact: contact.schema,
    login: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default new  mongoose.model("Client", clientSchema);