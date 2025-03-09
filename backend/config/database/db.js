const mongoose = require('mongoose');

// database connection with mongoose

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log('✅ database connection successful');
  } catch (error) {
    console.log('❌ DB connection error: ', error);
  }
};

module.exports = connectDB;
