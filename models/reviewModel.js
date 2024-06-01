const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'review title required'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    // Parent reference
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to user'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'review must belong to product'],
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name profileImg',
  });
  next();
});

// Calculate average product ratings and quantity
reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId
) {
  const result = await this.aggregate([// it means review model
    {
      $match: { product: productId },
    }, // Stage 1 "get all reviews in specific product"
    {
      $group: {
        _id: 'product', // refers to  the product  the above document 
        avgRating: { $avg: '$rating' },//refers to  the rating  the above document 
        nRatings: { $sum: 1 },
      },
    }, // Stage 2
  ]);
  // console.log(result);==> [{_id :'product',avgRating:4.5,ratingQuantity:2}]
  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRating,//result of 0 it the array had only valu
      ratingsQuantity: result[0].nRatings,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0, // set default value
      ratingsQuantity: 0, // set default value
    });
  }
};
// calling calcAverageRatingsAndQuantity method 
reviewSchema.post('save', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);// calcAverageRatingsAndQuantity return promise so  i  put await  
});

reviewSchema.post('remove', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);
