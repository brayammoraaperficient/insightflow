const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

// Mock Express app and auth middleware
const app = express();
app.use(express.json());

// Dummy user and secret
const SECRET = 'testsecret';
const user = { id: 1, username: 'testuser' };

// Auth route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'testuser' && password === 'password') {
    const token = jwt.sign(user, SECRET);
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Protected route
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing auth header' });
  try {
    jwt.verify(authHeader.replace('Bearer ', ''), SECRET);
    res.json({ data: 'protected' });
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
});

describe('Auth Flows', () => {
  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should fail login with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'wrong', password: 'bad' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('should access protected route with valid token', async () => {
    const token = jwt.sign(user, SECRET);
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBe('protected');
  });

  it('should fail protected route with missing auth header', async () => {
    const res = await request(app)
      .get('/protected');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Missing auth header');
  });

  it('should fail protected route with invalid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer badtoken');
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Invalid token');
  });
});
