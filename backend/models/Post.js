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
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  toJSON: { virtuals: true },  // Include virtuals when document is converted to JSON
  toObject: { virtuals: true }
});

postSchema.methods.getAvgScore = async function(){
  const post = this;
  if (!post.ratings) {
    return 0;
  }
  const len = post.ratings.length; // TODO this is wrong
  let sum = 0;
  if (len <= 0){
    return 0;
  }
  else{
    await post.populate('PostRatings')
    for (let i = 0; i < len; i++) {
      sum += post.ratings[i].score;
    }
  }
  return sum/len;
}



// Get all by post id from ratings
postSchema.virtual('PostRatings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'post',
  justOne: false
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
