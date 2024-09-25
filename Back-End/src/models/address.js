import mongoose from 'mongoose';


const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        maxLength: 100,
        required: true,
        nullable: false
    },
    number: {
        type: String,
        maxLength: 10,
        required: true,
        nullable: false
    },
    city: {
        type: String,
        maxLength: 50,
        required: true,
        nullable: false
    },
    state: {
        type: String,
        maxLength: 50,
        required: true,
        nullable: false
    },
    zipCode: {
        type: String,
        maxLength: 9,
        required: true,
        nullable: false
    },
});

export default mongoose.model('Address', addressSchema);