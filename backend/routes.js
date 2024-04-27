// routes.js
const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const Rating = require('./models/Rating');
const Recipe = require('./models/Recipe')
const User = require('./models/User');
const { get_recipe} = require('./utils/engine');

// GET user by username
router.get('/user/username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

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
      res.status(500).json({ error: error.message });
  }
});

// Generate recipe with username and ingredients
router.post('/recipe/generate', async (req, res) => {
  try {
    // used is recipes that user has already used and wants to regenerate
    const { ingredients, username, used } = req.body;
    // Find user recipes used from mongodb find by username
    const curUser = await User.findOne({ username });
    const recipes = await get_recipe(ingredients, curUser.tastePreferences, curUser.allergies, curUser.recipesUsed, used);
    console.log(req.body)
    res.status(200).json({
      success: true,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// Create Recipe with ingredients
router.post('/recipe/create', async (req, res) => {
  try {
    // Extracting recipe data from the request body
    const { name, ingredients, instructions, calories, foodCategories } = req.body;

    // Construct a new recipe object with all required and optional fields
    const recipeData = {
      name,
      ingredients,
      instructions,
      calories,
      foodCategories,
      ratings: []  // Initialize ratings as an empty array
    };
    const recipe = new Recipe(recipeData);

    // Save the new recipe to the database
    await recipe.save();

    // add to user's recipes used
    const user = await User.findOne({ username: req.body.username });
    user.recipesUsed.push(recipe);
    await user.save();

    // Return a success response with the created recipe
    res.status(200).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe
    });
  } catch (error) {
    // Handle any errors that occur during the save operation
    res.status(500).json({
      error: error.message
    });
  }
});

// add recipe to user's recipesUsed
router.post('/recipe/add', async (req, res) => {
  try {
    const { username, recipe_id } = req.body;
    const user = await User.findOne({ username });
    const recipe = await Recipe.findOne({ _id: recipe_id });
    if (!user || !recipe) {
      return res.status(404).json({
        success: false,
        message: 'User or Recipe not found'
      });
    }
    user.recipesUsed.push(recipe);
    await user.save();
    res.status(200).json({
      success: true,
      message: 'Recipe added to user successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// Get Post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('user').populate('recipe').populate('ratings');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// TODO: get Posts by User
// Get Posts by User
router.get('/post/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ user: id }).populate('user').populate('recipe').populate('ratings');
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Get Recent Posts - Returns 'n' recent posts
router.get('/post/recent/:n', async (req, res) => {
  try {
    const n = parseInt(req.params.n); // Convert the parameter to an integer

    // Validate the parameter to ensure it's a positive integer
    if (isNaN(n) || n < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid number of posts requested."
      });
    }


    // Fetch the latest 'n' posts, sorting by creation date in descending order, populate GlobalRatings and PostRating virtuals as well
    const posts = await Post.find().sort({ createdAt: -1 }).limit(n)
    .populate('user')
    .populate('recipe')
    .populate({
      path: 'recipe',
      populate: {
        path: 'GlobalRatings'
      }
    })
    .populate({
      path: 'PostRatings',
      populate: {
        path: 'user'
      }
    })
    console.log(posts[0])


    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// Create Post
router.post('/post/create', async (req, res) => {
  try {
    const { caption, username, recipename } = req.body;

    // Ensure the user ID is provided (User existence check could also be added here if necessary)
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID must be provided"
      });
    }
    // get recipe by name then add to post
    const recipe = await Recipe.findOne({ name: recipename })
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    const postData = { caption, user, recipe };
    const post = new Post(postData);
    await post.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// Delete Post
router.delete('/post/delete/:id', async (req, res) => {
  try {
    // Extracting the post ID from the URL parameters
    const { id } = req.params;

    // Attempt to delete the post using the extracted ID
    const result = await Post.findByIdAndDelete(id);

    // If the delete operation didn't find the post, send a 404 error
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Return a success response if the post was deleted
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    // If an exception occurs, return an error response
    res.status(500).json({
      error: error.message
    });
  }
});

// get rating by post id
router.get('/rating/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await Rating.find({ post: id }).populate('user').populate('recipe').populate('post');
    res.status(200).json({
      success: true,
      data: ratings
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// create rating
router.post('/rating/create', async (req, res) => {
  try {
    const { username, recipename, post_id, score, comment } = req.body;

    // Example of resolving entities (the actual implementation would likely be more complex)
    const user = await User.findOne({ username: username });
    // get recipe to add to rating
    const recipe = await Recipe.findOne({ name: recipename });
    // get post to add to rating
    const post = await Post.findOne({ _id: post_id });

    // Validate that required entities are provided
    if (!user || !recipe || !post) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (user, recipe, or post)."
      });
    }

    // Check score is within the acceptable range
    if (score < 1 || score > 5 || !Number.isInteger(score)) {
      return res.status(400).json({
        success: false,
        message: "Score must be an integer between 1 and 5."
      });
    }

    // Construct a new rating object with the provided data
    const ratingData = {
      user,
      recipe,
      post,
      score,
      comment
    };
    const rating = new Rating(ratingData);

    // Save the new rating to the database
    await rating.save();


    res.status(201).json({
      success: true,
      message: 'Rating created successfully',
      data: rating
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error
    });
  }
});



// POST user settings (only update the fields that are provided)
// IMPORTANT this will overwrite the user's allergies and tastePreferences, so be sure to include all of them, not just edited ones
// This makes sure user is able to delete allergies or tastePreferences if they want
router.post('/user/settings', async (req, res) => {
  try {
    const { username, allergy, tastePreferences } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    if (allergy) {
      user.allergy = allergy;
    }
    if (tastePreferences) {
      user.tastePreferences = tastePreferences;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: 'User settings updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// GET user settings
router.get('/user/settings/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User settings retrieved successfully',
      data: {
        allergy: user.allergy,
        tastePreferences: user.tastePreferences
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});



module.exports = router;

