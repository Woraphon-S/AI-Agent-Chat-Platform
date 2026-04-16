import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMProvider, ChatMessage, LLMResponse } from './llm.strategy';

export class GeminiProvider extends LLMProvider {
  private genAI: any;
  private model: any;

  getName(): string {
    return 'gemini';
  }
  async generateResponse(messages: ChatMessage[], apiKey: string, systemPrompt?: string): Promise<LLMResponse> {
    this.genAI = new GoogleGenerativeAI(apiKey);

    this.model = this.genAI.getGenerativeModel(
      {
        model: 'gemini-flash-lite-latest',
        systemInstruction: systemPrompt || 'คุณคือผู้ช่วย AI มืออาชีพที่มีทักษะการจัดโครงสร้างข้อมูลยอดเยี่ยม (Expert Information Architect)\n\nกฎเหล็กในการตอบ (MANDATORY Rules):\n1. ต้องมีตัวเลขหัวข้อหลักชัดเจน เช่น **1. ชื่อหัวข้อหลัก**\n2. ทุกหัวข้อย่อย "ต้องย่อหน้า" โดยใช้เครื่องหมายขีด (-) และเว้นวรรค 3 ช่องเพื่อให้เห็นย่อหน้าชัดเจน\n3. ต้องเว้นบรรทัดว่าง (1 Blank Line) ระหว่างหัวข้อหลักและหัวข้อถัดไปเสมอ ห้ามเขียนติดกัน\n4. ใช้ตัวหนา (Bold) สำหรับหัวข้อและคำสำคัญ\n5. หากมีการสรุปเนื้อหา ให้ใช้รูปแบบลำดับขั้น (Hierarchy) เสมอ\n6. ห้ามเดาข้อมูล (No Guessing): หากเป็นข้อมูลที่ต้องการความถูกต้องแม่นยำสูง (เช่น ราคาน้ำมัน, ข่าววันนี้, ตัวเลขทางสถิติ) และคุณไม่มีข้อมูลในฐานความรู้ ให้ตอบตามตรงว่า "ขออภัยครับ ผมไม่มีข้อมูลส่วนนี้ในฐานความรู้ของผม" ห้ามสร้างข้อมูลเท็จหรือคาดเดาอนาคตขึ้นมาเองโดยเด็ดขาด'
      }
    );

    const lastMessage = messages[messages.length - 1].content;
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chat = this.model.startChat({
      history: history,
    });

    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return {
          content: response.text(),
        };
      } catch (error: any) {
        const isTransient = error.message?.includes('503') || error.message?.includes('Service Unavailable');
        if (isTransient && retries < maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
          continue;
        }
        throw error;
      }
    }

    throw new Error('MONTO AI is currently experiencing high demand. Please try again in a few moments.');
  }
}
