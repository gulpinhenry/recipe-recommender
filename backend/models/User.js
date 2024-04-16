const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    match: [/.+@.+\..+/, 'Must use a valid email address'],
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
    ref: 'Recipe',
    required: false,
  }],
}, {
  timestamps: true,
});

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `recipeCount` with the number of used recipes we have
userSchema.virtual('recipeCount').get(function () {
  return this.recipesUsed.length;
});


const User = mongoose.model('User', userSchema);

module.exports = User;
