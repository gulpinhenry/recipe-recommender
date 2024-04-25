const mongoose = require('mongoose');
const Rating = require('./Rating');
const Post = require('./Post');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // remove this later
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
  }]
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  toJSON: { virtuals: true },  // Include virtuals when document is converted to JSON
  toObject: { virtuals: true }
});

recipeSchema.virtual('GlobalRatings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'recipe',
  justOne: false
});


// recipeSchema.methods.getAvgScore = async function(){
//   const recipe = this;
//   console.log(recipe);
//   if (!recipe.ratings) {
//     return 0;
//   }
//   const len = recipe.ratings.length;
//   console.log(len);
//   let sum = 0;
//   if (len <= 0){
//     return 0;
//   }
//   else{
//     await recipe.populate('GlobalRatings')
//     for (let i = 0; i < len; i++) {
//       sum += recipe.ratings[i].score;
//     }
//   }
//   return sum/len;
// }


// recipeSchema.virtual('Score').get(function(){
//   return this.getAvgScore();
// })




const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
