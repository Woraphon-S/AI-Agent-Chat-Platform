import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export class AuthService {
  async register(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    return { user: { id: user.id, email: user.email, name: user.name }, token };
  }

  async saveApiKey(userId: string, provider: string, key: string) {
    return prisma.apiKey.upsert({
      where: {
        userId_provider: {
          userId,
          provider,
        },
      },
      update: { key },
      create: {
        userId,
        provider,
        key,
      },
    });
  }

  async getUserApiKeys(userId: string) {
    const keys = await prisma.apiKey.findMany({
      where: { userId },
      select: { provider: true, createdAt: true },
    });
    return keys;
  }
}
