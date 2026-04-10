import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const saveApiKey = async (req: AuthRequest, res: Response) => {
  try {
    const { provider, key } = req.body;
    const userId = req.user!.id;
    await authService.saveApiKey(userId, provider, key);
    res.json({ message: 'API Key saved successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getApiKeys = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const keys = await authService.getUserApiKeys(userId);
    res.json(keys);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
