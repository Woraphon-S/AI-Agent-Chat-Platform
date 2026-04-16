import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMProvider, ChatMessage, LLMResponse } from './llm.strategy';

export class GeminiProvider extends LLMProvider {
  private genAI: any;
  private model: any;

  getName(): string {
    return 'gemini';
  }

  async generateResponse(messages: ChatMessage[], apiKey: string): Promise<LLMResponse> {
    this.genAI = new GoogleGenerativeAI(apiKey);
    console.log(`🤖 Attempting Gemini call with model: gemini-pro (v1)`);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' }, { apiVersion: 'v1' });

    // Separate last message as the new prompt, others as context
    const lastMessage = messages[messages.length - 1].content;
    const history = messages.slice(0, messages.length - 1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = this.model.startChat({
      history,
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return { content: text };
  }
}
