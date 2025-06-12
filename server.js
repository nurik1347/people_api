const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // ✅

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB ulanildi'))
  .catch((err) => console.log('MongoDB xatosi:', err));

// Routes
app.use('/api/users', userRoutes); // ✅

app.get('/', (req, res) => {
  res.send('User API ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
