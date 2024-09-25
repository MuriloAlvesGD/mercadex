import express from 'express';
import ProductController from '../controller/ProductController.js';
import {tokenValidate} from "../middleware/Auth.js";
const productRouter = express.Router();

productRouter.get('/', tokenValidate, ProductController.getAllProducts)

export default productRouter;