const mongoose = require('mongoose');
const Rating = require('./Rating');
const Post = require('./Post');

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

recipeSchema.methods.getAvgScore = async function(){
  const recipe = this;
  const len = recipe.ratings.length;
  let sum = 0;
  if (len <= 0){
    return 0;
  }
  else{
    await recipe.populate('ratings')
    for (let i = 0; i < len; i++) {
      sum += recipe.ratings[i].score;
    }
  }
  return sum/len;
}


recipeSchema.virtual('Score').get(function(){
  return this.getAvgScore();
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
