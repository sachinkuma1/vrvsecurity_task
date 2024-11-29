// File: src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/seller', sellerRoutes);
app.use('/api/v1/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();