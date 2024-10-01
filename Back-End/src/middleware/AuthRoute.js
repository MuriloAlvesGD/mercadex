import express from 'express';
import {signin, getAccessLevel, logout} from './AuthController.js';
import {tokenValidate} from "./Auth.js";
const router = express.Router();

router.get('/', tokenValidate, getAccessLevel);
router.post("/signin", signin);
router.get("/logout", logout);

export default router;