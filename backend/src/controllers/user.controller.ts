import { Request, Response } from 'express';
import prisma from '../config/prisma';

export class UserController {
  async updateProfile(req: Request, res: Response) {
    const { name, avatarUrl } = req.body;
    const userId = (req as any).user.id;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, avatarUrl },
        select: {
          id: true,
          email: true,
          name: true,
          avatarUrl: true,
          systemPrompt: true,
        }
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  }

  async updateSettings(req: Request, res: Response) {
    const { systemPrompt } = req.body;
    const userId = (req as any).user.id;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { systemPrompt },
        select: {
          id: true,
          email: true,
          name: true,
          avatarUrl: true,
          systemPrompt: true,
        }
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update settings' });
    }
  }

  async getMe(req: Request, res: Response) {
    const userId = (req as any).user.id;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          avatarUrl: true,
          systemPrompt: true,
        }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  }
}
