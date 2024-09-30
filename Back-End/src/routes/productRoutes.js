import express from 'express';
import ProductController from '../controller/ProductController.js';
import {tokenValidate} from "../middleware/Auth.js";
import productController from "../controller/ProductController.js";
const productRouter = express.Router();

productRouter.get('/', tokenValidate, ProductController.getAllProducts);
productRouter.post('/',tokenValidate, productController.createProduct);
productRouter.get('/group', tokenValidate, ProductController.getProductsGroup);
productRouter.put('/:id', tokenValidate, productController.updateProduct);
productRouter.delete('/:id', tokenValidate, productController.deleteProduct);

export default productRouter;