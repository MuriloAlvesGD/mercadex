import express from 'express';
import ProductController from '../controllers/productController.js';
import {tokenValidate} from "../middleware/Auth.js";
import productController from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.get('/', tokenValidate, ProductController.getAllProducts);
productRouter.post('/',tokenValidate, productController.createProduct);
productRouter.get('/group', tokenValidate, ProductController.getProductsGroup);
productRouter.get('/stock', tokenValidate, ProductController.getAllProductsOnStock)
productRouter.put('/:id', tokenValidate, productController.updateProduct);
productRouter.delete('/:id', tokenValidate, productController.deleteProduct);

export default productRouter;