// routes.js
const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const Rating = require('./models/Rating');
const Recipe = require('./models/Recipe')
const User = require('./models/User');
const {
  createUser,
  createRecipe,
  createPost,
  createRating,
  deletePost,
  getUserDietAllergies,
  getPostBefore
} = require('./crud');

// Create User
router.post('/createUser', async (req, res) => {
  try {
      const user = await createUser(req.body);
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Create Recipe
router.post('/createRecipe', async (req, res) => {
  try {
      const recipe = await createRecipe(req.body);
      res.status(201).json(recipe);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Create Post
router.post('/createPost', async (req, res) => {
  try {
      const post = await createPost(req.body);
      res.status(201).json(post);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Create Rating
router.post('/createRating', async (req, res) => {
  try {
      const rating = await createRating(req.body);
      res.status(201).json(rating);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Delete Post
router.delete('/deletePost/:id', async (req, res) => {
  try {
      const success = await deletePost(req.params.id);
      if (success) {
          res.status(204).send();
      } else {
          res.status(404).send('Post not found');
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get User Diet Allergies
router.get('/getUserDietAllergies/:id', async (req, res) => {
  try {
      const dietAllergies = await getUserDietAllergies(req.params.id);
      res.json(dietAllergies);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get Posts Before Specific Time
router.get('/getPostBefore', async (req, res) => {
  try {
      const { time } = req.query;
      const posts = await getPostBefore(time);
      res.json(posts);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;
