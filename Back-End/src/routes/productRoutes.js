import express from 'express';
import ProductController from '../controller/ProductController.js';
import {tokenValidate} from "../middleware/Auth.js";
import productController from "../controller/ProductController.js";
const productRouter = express.Router();

productRouter.get('/', tokenValidate, ProductController.getAllProducts)
productRouter.post('/', productController.createProduct);

export default productRouter;