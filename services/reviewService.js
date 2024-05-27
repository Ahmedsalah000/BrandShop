const Review = require('../models/Review');

const getAllReviews = async () => {
  return await Review.find();
};

const getReviewById = async (id) => {
  return await Review.findById(id);
};

const createReview = async (reviewData) => {
  const newReview = new Review(reviewData);
  return await newReview.save();
};

const updateReview = async (id, reviewData) => {
  return await Review.findByIdAndUpdate(id, reviewData, { new: true });
};

const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
