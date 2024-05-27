const { check } = require('express-validator');

const validateCustomer = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('address').notEmpty().withMessage('Address is required')
];

module.exports = validateCustomer;
