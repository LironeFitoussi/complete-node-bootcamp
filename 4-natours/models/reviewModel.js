const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please provide a review'],
    },
    rating: {
      type: Number,
      min: [1, 'Please provide a rating above 1'],
      max: [5, 'Please provide a rating below 5'],
      required: [true, 'Please provide a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Please provide a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review musr belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: ['user', 'tour'],
//     //   select: '-__v -passwordChangedAt',
//   });
//   next();
// });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
