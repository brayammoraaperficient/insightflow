const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/data', require('./routes/data'));
app.use('/visualizations', require('./routes/visualizations'));
app.use('/users', require('./routes/users'));
app.use('/recommendations', require('./routes/recommendations'));
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.send('InsightFlow Service Running');
});

app.listen(port, () => {
  console.log(`InsightFlow service listening on port ${port}`);
});
