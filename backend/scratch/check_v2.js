require('dotenv').config({ path: '../.env' });

async function check() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Using Key:', apiKey?.substring(0, 10) + '...');
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
    const data = await response.json();
    console.log('Available Models:');
    if (data.models) {
      data.models.forEach(m => {
        console.log(`- ${m.name}`);
      });
    } else {
      console.log('No models found, response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error listing models:', error.message);
  }
}

check();
