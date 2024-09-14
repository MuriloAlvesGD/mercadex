import mongoose from 'mongoose';
import validator from "validator";

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
        upper: true,
        nullable: false
    },
    description: {
        type: String,
        maxLength: 255,
        default: '',
        nullable: true,
    },
    acessLevel: {
        type: Number,
        default: 0,
        required: true,
        nullable: false
    }

})

module.exports = mongoose.model('Assignment', assignmentSchema)