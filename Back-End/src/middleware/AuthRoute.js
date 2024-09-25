import express from 'express';
import {signin, getAccessLevel} from './AuthController.js';
import {tokenValidate} from "./Auth.js";
const router = express.Router();

router.get('/', tokenValidate, getAccessLevel);
router.post("/signin", signin);

export default router;