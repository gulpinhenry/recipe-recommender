const mongoose = require('mongoose');
const Post = require('./Post');
const Recipe = require('./Recipe');

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This assumes your User model is named 'User'
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // This assumes your Recipe model is named 'Recipe'
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // This assumes your Recipe model is named 'Recipe'
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1, // Assuming the score's minimum is 1
    max: 5, // Assuming the score's maximum is 5
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  comment: {
    type: String,
    default: '', // You can make this required if you like
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

ratingSchema.pre('save', async function (next) {
  const recipe = await Recipe.findById(this.recipe);
  await recipe.ratings.push(this._id);

  const post = await Post.findById(this.post);
  await post.ratings.push(this._id);


  next()
})

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
