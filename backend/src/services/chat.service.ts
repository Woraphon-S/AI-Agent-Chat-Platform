import prisma from '../config/prisma';
import { ProviderFactory } from '../strategies/provider.factory';
import { ChatMessage } from '../strategies/llm.strategy';

export class ChatService {
  async sendMessage(userId: string, chatId: string, content: string, providerName: string) {
    // 1. Get user's API key for the provider
    let apiKey: string | undefined;
    
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: providerName,
        },
      },
    });

    if (apiKeyRecord) {
      apiKey = apiKeyRecord.key;
    } else {
      // Fallback to environment variables for portfolio demo
      apiKey = process.env.GEMINI_API_KEY;
    }

    if (!apiKey) {
      throw new Error(`API key for ${providerName} not found. Please add it in settings.`);
    }

    // 1b. Get user's system prompt
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { systemPrompt: true }
    });

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
    const aiResponse = await provider.generateResponse(messages, apiKey!, user?.systemPrompt || undefined);

    // 4. Save messages to DB
    await prisma.message.create({
      data: {
        chatId,
        role: 'user',
        content,
      },
    });

    // 5. Auto-generate title if it's the first message
    if (history.length === 0) {
      try {
        const titlePrompt: ChatMessage[] = [
          { role: 'user', content: `Summarize this message into a 3-5 word chat title. Return ONLY the title: "${content}"` }
        ];
        const titleResponse = await provider.generateResponse(titlePrompt, apiKey!);
        const newTitle = titleResponse.content.replace(/["']/g, '').trim();
        
        await prisma.chat.update({
          where: { id: chatId },
          data: { title: newTitle }
        });
      } catch (error) {
        // Silent failure for auto-title generation if needed
      }
    }

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

  async deleteChat(userId: string, chatId: string) {
    return prisma.$transaction(async (tx) => {
      // 1. Verify existence and ownership
      const chat = await tx.chat.findUnique({
        where: { id: chatId },
      });

      if (!chat) {
        throw new Error('Chat not found');
      }

      if (chat.userId !== userId) {
        throw new Error('Unauthorized to delete this chat');
      }

      // 2. Delete messages
      await tx.message.deleteMany({
        where: { chatId },
      });

      // 3. Delete the chat
      return tx.chat.delete({
        where: { id: chatId },
      });
    });
  }
}
