import express from 'express';
import {
    createPromotion, deletePromotionById,
    getAllPromotions,
    getPromotionById,
    updatePromotion
} from '../controllers/promotionController.js';
import {tokenValidate} from "../middleware/Auth.js";

const router = express.Router();

router.route("/")
    .post(tokenValidate, createPromotion)
    .get(tokenValidate, getAllPromotions)

router.route("/:id")
    .get(tokenValidate, getPromotionById)
    .put(tokenValidate, updatePromotion)
    .delete(tokenValidate, deletePromotionById)

export default router;