import express from 'express';
import productRouter from './src/routes/productRoutes.js';
import functionaryRoute from "./src/routes/functionaryRoutes.js";
import AuthRoute from "./src/middleware/AuthRoute.js";
import EnterpriseRoutes from "./src/routes/EnterpriseRoutes.js";
import PromotionRoutes from "./src/routes/promotionRoutes.js";
const routes = express.Router();

routes.use('/products', productRouter);
routes.use('/functionarys', functionaryRoute);
routes.use('/auth', AuthRoute);
routes.use('/enterprise', EnterpriseRoutes);
routes.use('/promotion', PromotionRoutes)


export default routes;