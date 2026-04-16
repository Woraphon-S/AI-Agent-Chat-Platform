const axios = require('axios');
require('dotenv').config({ path: '../.env' });

async function check() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Using Key:', apiKey?.substring(0, 10) + '...');
  
  try {
    const response = await axios.get(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
    console.log('Available Models:');
    response.data.models.forEach(m => {
      console.log(`- ${m.name}`);
    });
  } catch (error) {
    console.error('Error listing models:', error.response?.data || error.message);
  }
}

check();
