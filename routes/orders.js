const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const validateOrder = require('../utils/validators/orders');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

// Get all orders
router.get('/', async (req, res) => {
  const orders = await OrderService.getAllOrders();
  res.json(orders);
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  const order = await OrderService.getOrderById(req.params.id);
  res.json(order);
});

// Create a new order
router.post('/', validateOrder, validatorMiddleware, async (req, res) => {
  const newOrder = await OrderService.createOrder(req.body);
  res.json(newOrder);
});

// Update an order
router.put('/:id', validateOrder, validatorMiddleware, async (req, res) => {
  const updatedOrder = await OrderService.updateOrder(req.params.id, req.body);
  res.json(updatedOrder);
});

// Delete an order
router.delete('/:id', async (req, res) => {
  await OrderService.deleteOrder(req.params.id);
  res.json({ message: 'Order deleted' });
});

module.exports = router;
