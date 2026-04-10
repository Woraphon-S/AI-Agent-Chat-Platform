import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/keys', authMiddleware, authController.saveApiKey);
router.get('/keys', authMiddleware, authController.getApiKeys);

export default router;
