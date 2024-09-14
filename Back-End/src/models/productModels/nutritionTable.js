import mongoose from "mongoose";

const nutritionTableSchema = new mongoose.Schema({
    calories: {
        type: Number,
        default: 0,
        required: true,
    },
    fat: {
        type: Number,
        default: 0,
        required: true,
    },
    sugar: {
        type: Number,
        default: 0,
        required: true,
    },
    carbohydrates: {
        type: Number,
        default: 0,
        required: true,
    },
    protein: {
        type: Number,
        default: 0,
        required: true,
    },
})

module.exports = mongoose.model("NutritionTable", nutritionTableSchema)