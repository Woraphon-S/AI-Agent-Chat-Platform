import prisma from '../config/prisma';
import { ProviderFactory } from '../strategies/provider.factory';
import { ChatMessage } from '../strategies/llm.strategy';

export class ChatService {
  async sendMessage(userId: string, chatId: string, content: string, providerName: string) {
    // 1. Get user's API key for the provider
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: providerName,
        },
      },
    });

    if (!apiKeyRecord) {
      throw new Error(`API key for ${providerName} not found. Please add it in settings.`);
    }

    // 2. Initializing Chat context (Load history)
    const history = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
    });

    const messages: ChatMessage[] = history.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    // Add current message
    messages.push({ role: 'user', content });

    // 3. Get AI Response
    const provider = ProviderFactory.getProvider(providerName);
    const aiResponse = await provider.generateResponse(messages, apiKeyRecord.key);

    // 4. Save messages to DB
    await prisma.message.create({
      data: {
        chatId,
        role: 'user',
        content,
      },
    });

    const savedAiMessage = await prisma.message.create({
      data: {
        chatId,
        role: 'assistant',
        content: aiResponse.content,
        model: providerName,
      },
    });

    return savedAiMessage;
  }

  async getChatHistory(userId: string, chatId: string) {
    return prisma.message.findMany({
      where: {
        chatId,
        chat: { userId },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createChat(userId: string, title: string) {
    return prisma.chat.create({
      data: {
        userId,
        title,
      },
    });
  }

  async getUserChats(userId: string) {
    return prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
