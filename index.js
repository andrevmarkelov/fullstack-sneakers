const express = require('express');
const cors = require('cors');
const app = express();
const sneakersRouter = require('./routes/sneakers');

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', sneakersRouter);

app.listen(4000, () => {
  console.log('Server started!');
});