import express from 'express';
import FunctionaryController from '../controller/functionaryController.js';
const functionaryRoute = new express.Router();

functionaryRoute.post('/register', FunctionaryController.create)

export default functionaryRoute;