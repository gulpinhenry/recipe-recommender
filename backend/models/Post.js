const mongoose = require('mongoose');


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
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating', // References the Rating model
  }]
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

postSchema.methods.getAvgScore = async function(){
  const post = this;
  const len = post.ratings.length;
  let sum = 0;
  if (len <= 0){
    return 0;
  }
  else{
    await post.populate('ratings')
    for (let i = 0; i < len; i++) {
      sum += post.ratings[i].score;
    }
  }
  return sum/len;
}

postSchema.virtual('Score').get(function(){
  return this.getAvgScore();
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
