import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { ChatService } from '../services/chat.service';

const chatService = new ChatService();

export const createChat = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const userId = req.user!.id;
    const chat = await chatService.createChat(userId, title || 'New Chat');
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};

export const getUserChats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const chats = await chatService.getUserChats(userId);
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { chatId, content, provider = 'gemini' } = req.body;
    const userId = req.user!.id;
    const message = await chatService.sendMessage(userId, chatId, content, provider);
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const getChatMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { chatId } = req.params;
    const userId = req.user!.id;
    const messages = await chatService.getChatHistory(userId, chatId);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const deleteChat = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { chatId } = req.params;
    const userId = req.user!.id;
    await chatService.deleteChat(userId, chatId);
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    next(error);
  }
};
