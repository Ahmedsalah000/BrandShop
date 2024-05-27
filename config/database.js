const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Connect to the database
dotenv.config({path:'config.env'});
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
