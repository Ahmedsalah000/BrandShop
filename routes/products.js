const express = require('express');
const router = express.Router();
const ProductService = require('../services/productService');
const validateProduct = require('../utils/validators/products');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

// Get all products
router.get('/', async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.json(products);
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  const product = await ProductService.getProductById(req.params.id);
  res.json(product);
});

// Create a new product
router.post('/', validateProduct, validatorMiddleware, async (req, res) => {
  const newProduct = await ProductService.createProduct(req.body);
  res.json(newProduct);
});

// Update a product
router.put('/:id', validateProduct, validatorMiddleware, async (req, res) => {
  const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
  res.json(updatedProduct);
});

// Delete a product
router.delete('/:id', async (req, res) => {
  await ProductService.deleteProduct(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
