const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/auth');
require('dotenv').config();
const { AzureOpenAI } = require('openai');
const { retrieveKBContext } = require('../controllers/kb');

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
    // Retrieve relevant KB context
    const kbContext = retrieveKBContext(message);
    // Compose prompt with KB context
    let systemPrompt = "You are a polite, customer-focused assistant for InsightFlow, a SaaS analytics tool. Always respond helpfully and kindly.";
    if (kbContext) {
      systemPrompt += `\nHere is some product context you MUST use in your reply:\n${kbContext}`;
    }
    const options = { endpoint, apiKey, deployment, apiVersion };
    const client = new AzureOpenAI(options);
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
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
    res.json({ reply, kbContext });
  } catch (err) {
    console.error('Azure OpenAI error:', err);
    if (err.statusCode === 429 || err.code === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }
    res.status(500).json({ error: 'Sorry, something went wrong. Please try again.' });
  }
});

module.exports = router;
