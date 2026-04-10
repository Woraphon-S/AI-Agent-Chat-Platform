import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { ChatService } from '../services/chat.service';

const chatService = new ChatService();

export const createChat = async (req: AuthRequest, res: Response) => {
  try {
    const { title } = req.body;
    const userId = req.user!.id;
    const chat = await chatService.createChat(userId, title || 'New Chat');
    res.status(201).json(chat);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserChats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const chats = await chatService.getUserChats(userId);
    res.json(chats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId, content, provider } = req.body;
    const userId = req.user!.id;
    const message = await chatService.sendMessage(userId, chatId, content, provider);
    res.json(message);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getChatMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = req.user!.id;
    const messages = await chatService.getChatHistory(userId, chatId);
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
