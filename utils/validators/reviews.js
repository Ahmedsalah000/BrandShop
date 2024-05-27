const { check } = require('express-validator');

const validateReview = [
  check('productId').notEmpty().withMessage('Product ID is required'),
  check('customerId').notEmpty().withMessage('Customer ID is required'),
  check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  check('comment').notEmpty().withMessage('Comment is required')
];

module.exports = validateReview;
