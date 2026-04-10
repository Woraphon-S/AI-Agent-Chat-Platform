import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMProvider, ChatMessage, LLMResponse } from './llm.strategy';

export class GeminiProvider extends LLMProvider {
  getName(): string {
    return 'gemini';
  }

  async generateResponse(messages: ChatMessage[], apiKey: string): Promise<LLMResponse> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Separate last message as the new prompt, others as context
    const lastMessage = messages[messages.length - 1].content;
    const history = messages.slice(0, messages.length - 1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history,
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return { content: text };
  }
}
