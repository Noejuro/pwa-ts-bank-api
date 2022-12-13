import { Router } from 'express'
const router = Router();

import * as bankCtrl from '../controllers/bank.controller.js'
import { verifyToken } from '../middlewares/index.js';

router.get('/access_token', verifyToken, bankCtrl.accessToken);
router.put('/associate_belvo', verifyToken, bankCtrl.associateBelvoData);
router.get('/transactions', verifyToken, bankCtrl.getTransactions);

export default router;