import { GeminiProvider } from './gemini.provider';
import { OpenAIProvider } from './openai.provider';
import { LLMProvider } from './llm.strategy';

export class ProviderFactory {
  private static providers: Record<string, LLMProvider> = {
    gemini: new GeminiProvider(),
    openai: new OpenAIProvider(),
  };

  static getProvider(name: string): LLMProvider {
    const provider = this.providers[name.toLowerCase()];
    if (!provider) {
      throw new Error(`Provider ${name} not supported`);
    }
    return provider;
  }
}
