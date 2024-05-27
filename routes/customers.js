const express = require('express');
const router = express.Router();
const CustomerService = require('../services/customerService');
const validateCustomer = require('../utils/validators/customers');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

// Get all customers
router.get('/', async (req, res) => {
  const customers = await CustomerService.getAllCustomers();
  res.json(customers);
});

// Get a customer by ID
router.get('/:id', async (req, res) => {
  const customer = await CustomerService.getCustomerById(req.params.id);
  res.json(customer);
});

// Create a new customer
router.post('/', validateCustomer, validatorMiddleware, async (req, res) => {
  const newCustomer = await CustomerService.createCustomer(req.body);
  res.json(newCustomer);
});

// Update a customer
router.put('/:id', validateCustomer, validatorMiddleware, async (req, res) => {
  const updatedCustomer = await CustomerService.updateCustomer(req.params.id, req.body);
  res.json(updatedCustomer);
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  const deletedCustomer = await CustomerService.deleteCustomer(req.params.id);
  res.json(deletedCustomer);
});

module.exports = router;
