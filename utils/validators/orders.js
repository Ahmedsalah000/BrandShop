const { check } = require('express-validator');

const validateOrder = [
  check('customerId').notEmpty().withMessage('Customer ID is required'),
  check('products').isArray().withMessage('Products must be an array'),
  check('products.*.productId').notEmpty().withMessage('Product ID is required'),
  check('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  check('totalPrice').isNumeric().withMessage('Total price must be a number'),
  check('status').notEmpty().withMessage('Status is required')
];

module.exports = validateOrder;
