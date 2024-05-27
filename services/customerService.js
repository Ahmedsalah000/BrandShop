const Customer = require('../models/Customer');

const getAllCustomers = async () => {
  return await Customer.find();
};

const getCustomerById = async (id) => {
  return await Customer.findById(id);
};

const createCustomer = async (customerData) => {
  const newCustomer = new Customer(customerData);
  return await newCustomer.save();
};

const updateCustomer = async (id, customerData) => {
  return await Customer.findByIdAndUpdate(id, customerData, { new: true });
};

const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
