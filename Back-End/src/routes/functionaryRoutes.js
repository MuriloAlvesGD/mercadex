import express from 'express';
import FunctionaryController from '../controllers/functionaryController.js';
const functionaryRoute = new express.Router();

functionaryRoute.post('/register', FunctionaryController.create)

export default functionaryRoute;