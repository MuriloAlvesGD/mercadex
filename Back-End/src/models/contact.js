import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        maxlength: 13,
        nullable: false,
    },
    email: {
        type: String,
        lowercase: true,
        nullable: true,
    }
})

export default mongoose.model('Contact', contactSchema)