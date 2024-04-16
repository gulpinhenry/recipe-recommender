// routes.js
const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const Rating = require('./models/Rating');
const Recipe = require('./models/Recipe')
const User = require('./models/User');

/**
 * 
 * Logs in a user.
 */
router.post('/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({
        message: 'Invalid username or password',
        error: 'INVALID USERNAME OR PASSWORD'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User login successful',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
    });
  }
});


/**
 * 
 * Creates a new user in the database.
 */
router.post('/user/create', async (req, res) => {
  try {

    const { username, email, password } = req.body;

    const userData = { username, email, password };
    const user = new User(userData);
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
});


module.exports = router;
