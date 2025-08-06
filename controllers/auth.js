const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user store for demo (replace with DB in production)
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }
  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(409).json({ error: 'User already exists.' });
  }
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });
  res.status(201).json({ message: 'User registered.' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful.', token });
};

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
