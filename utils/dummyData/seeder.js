const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const Product = require('../../models/Product');
const Customer = require('../../models/Customer');
const dbData = require('./db.json');

// Load environment variables
dotenv.config({path:'config.env'});
const connectDB = require('../../config/database');

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Customer.deleteMany();

    const products = dbData.products.map(product => ({ ...product }));
    const customers = dbData.customers.map(customer => ({ ...customer }));

    await Product.insertMany(products);
    await Customer.insertMany(customers);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Clear the database
  importData();
} else {
  console.log('Specify the -d flag to import data.'.yellow);
  process.exit();

}
