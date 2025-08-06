const request = require('supertest');
const express = require('express');
const chatRouter = require('../routes/chat');

// Mock LLM response
jest.mock('@azure/openai', () => ({
  OpenAIClient: jest.fn().mockImplementation(() => ({
    getCompletions: jest.fn().mockResolvedValue({ choices: [{ text: 'Mocked response' }] })
  }))
}));

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);

describe('Chat Endpoint', () => {
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
  let token;
  beforeAll(() => {
    // Directly generate a valid JWT for testing
    token = jwt.sign({ username: 'testuser' }, JWT_SECRET, { expiresIn: '1h' });
  });

  it('should return a response for a valid chat request', async () => {
    const res = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'What is InsightFlow?' });
    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBeDefined();
  });

  it('should handle missing message field', async () => {
    const res = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
