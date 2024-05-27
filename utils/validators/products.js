const { check } = require('express-validator');

const validateProduct = [
  check('name').notEmpty().withMessage('Name is required'),
  check('price').isNumeric().withMessage('Price must be a number'),
  check('description').notEmpty().withMessage('Description is required'),
  check('category').notEmpty().withMessage('Category is required'),
  check('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];

module.exports = validateProduct;
