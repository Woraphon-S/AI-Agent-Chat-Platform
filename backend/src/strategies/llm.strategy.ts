export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  content: string;
}

export abstract class LLMProvider {
  abstract getName(): string;
  abstract generateResponse(messages: ChatMessage[], apiKey: string): Promise<LLMResponse>;
}
