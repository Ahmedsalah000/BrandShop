const express = require('express');
const router = express.Router();
const ReviewService = require('../services/reviewService');
const validateReview = require('../utils/validators/reviews');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

// Get all reviews
router.get('/', async (req, res) => {
  const reviews = await ReviewService.getAllReviews();
  res.json(reviews);
});

// Get a review by ID
router.get('/:id', async (req, res) => {
  const review = await ReviewService.getReviewById(req.params.id);
  res.json(review);
});

// Create a new review
router.post('/', validateReview, validatorMiddleware, async (req, res) => {
  const newReview = await ReviewService.createReview(req.body);
  res.json(newReview);
});

// Update a review
router.put('/:id', validateReview, validatorMiddleware, async (req, res) => {
  const updatedReview = await ReviewService.updateReview(req.params.id, req.body);
  res.json(updatedReview);
});

// Delete a review
router.delete('/:id', async (req, res) => {
  await ReviewService.deleteReview(req.params.id);
  res.json({ message: 'Review deleted' });
});

module.exports = router;
