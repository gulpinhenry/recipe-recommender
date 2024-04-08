// routes.js
const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const Rating = require('./models/Rating');
const Recipe = require('./models/Recipe')
const User = require('./models/User');


router.post('/user/create', async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    res.status(201).json({
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
