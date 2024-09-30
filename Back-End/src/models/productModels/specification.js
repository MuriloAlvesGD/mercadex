import mongoose from 'mongoose';
import nutritionTable from './nutritionTable.js';

const specificationSchema = new mongoose.Schema({
    category: {
        type: String,
        maxLength: 100,
        required: true,
        default: "todos",
    },
    weight: {
        type: Number,
        required: true,
        default: 0,
    },
    nutritionTable: nutritionTable.schema,
})

export default new mongoose.model("Specifications", specificationSchema);