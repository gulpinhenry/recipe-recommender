const mongoose = require('mongoose');
const Rating = require('./Rating');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end
  },
  ingredients: [{
    type: String,
    required: true,
  }],
  instructions: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    default: null, // Defaults to null if not provided
  },
  foodCategories: [{
    type: String,
    default: null, // Defaults to null if not provided
  }],
  ratings: [[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating', // References the Rating model
  }]]
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
