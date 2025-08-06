const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/auth');
require('dotenv').config();
const { AzureOpenAI } = require('openai');

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const apiVersion = '2024-04-01-preview';
const modelName = deployment;

// POST /chat - Accepts user messages and returns AI-generated replies
router.post('/', authMiddleware, async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const options = { endpoint, apiKey, deployment, apiVersion };
    const client = new AzureOpenAI(options);
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a polite, customer-focused assistant. Always respond helpfully and kindly." },
        { role: "user", content: message }
      ],
      max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      model: modelName
    });

    if (response?.error !== undefined && response.status !== "200") {
      throw response.error;
    }
    const reply = response.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";
    res.json({ reply });
  } catch (err) {
    console.error('Azure OpenAI error:', err);
    if (err.statusCode === 429 || err.code === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }
    res.status(500).json({ error: 'Sorry, something went wrong. Please try again.' });
  }
});

module.exports = router;
