import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function checkModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in .env');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    console.log('--- Listing All Available Models ---');
    const result = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).getGenerativeModel({ model: 'gemini-1.5-flash' }); // Placeholder to get access to listModels if needed, but the SDK has it elsewhere
    
    // Actually, in @google/generative-ai 0.21.0:
    // listModels is not on genAI directly, it's on the client if using REST or special methods
    // Let's try to just hit a dummy URL to see if the key works at all
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
    const data = await response.json();
    console.log('Models list result:', JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.error('General Error:', error.message);
  }
  } catch (error: any) {
    console.error('General Error:', error.message);
  }
}

checkModels();
