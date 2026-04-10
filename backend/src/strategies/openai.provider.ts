import OpenAI from 'openai';
import { LLMProvider, ChatMessage, LLMResponse } from './llm.strategy';

export class OpenAIProvider extends LLMProvider {
  getName(): string {
    return 'openai';
  }

  async generateResponse(messages: ChatMessage[], apiKey: string): Promise<LLMResponse> {
    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    return { content: response.choices[0].message.content || '' };
  }
}
