const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const client = require('./config/db');
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;





client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('Database connection error:', err));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});



app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
