
const express = require('express');
const session = require('express-session');
const { passport } = require('./controllers/oauth');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// OAuth routes
app.use('/auth', require('./routes/auth'));

// Routes
app.use('/data', require('./routes/data'));
app.use('/visualizations', require('./routes/visualizations'));
app.use('/users', require('./routes/users'));
app.use('/recommendations', require('./routes/recommendations'));
app.use('/api', require('./routes/api'));
app.use('/chat', require('./routes/chat'));

app.get('/', (req, res) => {
  res.send('InsightFlow Service Running');
});

app.listen(port, () => {
  console.log(`InsightFlow service listening on port ${port}`);
});
