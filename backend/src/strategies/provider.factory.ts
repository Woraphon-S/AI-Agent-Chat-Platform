import { GeminiProvider } from './gemini.provider';
import { LLMProvider } from './llm.strategy';

export class ProviderFactory {
  private static providers: Record<string, LLMProvider> = {
    gemini: new GeminiProvider(),
  };

  static getProvider(name: string): LLMProvider {
    const provider = this.providers[name.toLowerCase()];
    if (!provider) {
      throw new Error(`Provider ${name} not supported`);
    }
    return provider;
  }
}
