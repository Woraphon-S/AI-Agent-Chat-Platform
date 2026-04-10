import { Router } from 'express';
import * as chatController from '../controllers/chat.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', chatController.createChat);
router.get('/', chatController.getUserChats);
router.post('/message', chatController.sendMessage);
router.get('/:chatId/messages', chatController.getChatMessages);

export default router;
