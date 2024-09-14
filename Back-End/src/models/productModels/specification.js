import mongoose from 'mongoose';
import validator from 'validator';
import nutritionTable from './nutritionTable';

const specificationSchema = new mongoose.Schema({
    category: {
        type: String,
        maxLength: 100,
        required: true,
        default: "default",
    },
    weight: {
        type: Number,
        required: true,
        default: 0,
    },
    nutritionTable: nutritionTable.schema,
})

module.exports = mongoose.model("Specifications", specificationSchema);