// routes.js
const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const Rating = require('./models/Rating');
const Recipe = require('./models/Recipe')
const User = require('./models/User');

/**
 * 
 * Checks if the user is logged in.
 */
router.get('/checkSession', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

/**
 * 
 * Creates a new user in the database.
 */
router.post('/user/create', async (req, res) => {
  try {
    // Check if the user is already logged in or if the username is taken
    if (req.session.username || req.session.sessionLoggedIn) {
      return res.status(400).json({
        message: 'User already logged in or username taken',
        error: 'STOPIT'
      });
    }

    const { username, email, password } = req.body;
    // Here, you should also check if the username is already taken in your database
    // and return an appropriate response if it is.

    const userData = { username, email, password };
    const user = new User(userData);
    
    await user.save();

    // Set session variables
    req.session.username = username;
    req.session.sessionLoggedIn = true;

    res.status(201).json({
      success: true, // Ensure to send a success flag
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


router.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid'); // Adjust this according to your session cookie name
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
