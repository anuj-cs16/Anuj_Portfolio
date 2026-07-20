const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/anuj_portfolio');
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Database connection failed: ${error.message}`);
    console.log('[MongoDB Notice] Continuing server startup. API will retry or operate in fallback mode until DB connection is established.');
  }
};

module.exports = connectDB;
