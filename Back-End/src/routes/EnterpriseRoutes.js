import express from 'express';
import EnterpriseController from '../controller/enterpriseController.js';
import {tokenValidate} from "../middleware/Auth.js";
const router = express.Router();

router.get('/all',tokenValidate, EnterpriseController.getDataOfAllEnterprises)
router.post('/create',tokenValidate, EnterpriseController.createEnterprise)

export default router;