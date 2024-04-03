const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: null,
    unique: true,
    sparse: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  tastePreferences: {
    type: [String],
    default: [],
  },
  dietAllergy: {
    type: [String],
    default: [],
  },
  recipesUsed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // This should match the name of your Recipe model
  }],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
