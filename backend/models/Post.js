const mongoose = require('mongoose');
const Rating = require('./Rating');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // Reference to the Recipe model, optional
    default: null,
  },
  picture: {
    type: String,
    default: '',
    trim: true,
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  toJSON: { virtuals: true },  // Include virtuals when document is converted to JSON
  toObject: { virtuals: true }
});

// Get average score method
postSchema.methods.getAvgScore = async function() {
  await this.populate('ratings').execPopulate(); // Correctly populate ratings
  const ratings = this.ratings;
  if (!ratings || ratings.length === 0) {
    return 0; // Return 0 if no ratings
  }

  const sum = ratings.reduce((acc, cur) => acc + cur.score, 0);
  const average = sum / ratings.length;
  return average;
};




// Get all by post id from ratings
postSchema.virtual('PostRatings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'post',
  justOne: false
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
