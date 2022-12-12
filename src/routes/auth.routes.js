import { Router } from 'express'
const router = Router();

import { checkDuplicatedEmail } from '../middlewares/index.js';

import * as authCtrl from '../controllers/auth.controller.js'

router.post('/signup', checkDuplicatedEmail, authCtrl.signUp);
router.post('/login', authCtrl.login);
router.get('/access_token', authCtrl.accessToken);

export default router;