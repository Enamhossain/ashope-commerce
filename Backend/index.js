const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const supportsRoutes = require('./routes/supportRoutes');
const bannerRoute = require('./routes/bannerRoute');
const client = require('./config/db');
const cookieParser = require("cookie-parser");
const { default: router } = require('./Controllers/UiControllar');
const { apiKeyMiddleware } = require('./middlewares/apiKeyMiddleware');
const app = express();
dotenv.config();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;


client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('Database connection error:', err));

app.use(
  cors({
    origin: ["https://ashop.vercel.app"], // ✅ Allow both ports
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true, // ✅ Allow cookies/auth headers
    
  })
);
app.use(express.json());

app.use("/api", userRoutes);
app.use('/api/products', productRoutes);
app.use("/",supportsRoutes );
app.use("/api/banners", bannerRoute);
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
