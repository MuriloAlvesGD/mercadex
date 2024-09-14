import mongoose from 'mongoose';
import validator from "validator";

const contactSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        maxlength: 13,
        nullable: false,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        nullable: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    }
})

module.exports = mongoose.model('Contact', contactSchema)