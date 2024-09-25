import express from 'express';
import productRouter from './src/routes/productRoutes.js';
import functionaryRoute from "./src/routes/functionaryRoutes.js";
import AuthRoute from "./src/middleware/AuthRoute.js";
import EnterpriseRoutes from "./src/routes/EnterpriseRoutes.js";
const routes = express.Router();

routes.use('/products', productRouter);
routes.use('/functionarys', functionaryRoute);
routes.use('/auth', AuthRoute);
routes.use('/enterprise', EnterpriseRoutes);


export default routes;