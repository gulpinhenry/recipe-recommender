// routes.js
const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const Rating = require('./models/Rating');
const Recipe = require('./models/Recipe')
const User = require('./models/User');
const { get_recipe} = require('./utils/engine');

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

// Generate recipe with user data (pass in dietAllergy, tastePreferences, etc.)
router.get('/recipe/generate', async (req, res) => {
  try {
    const { user } = req.body;
    const recipes = get_recipe(user.dietAllergy, user.tastePreferences, user.dietAllergy);
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


// Create Recipe with ingredients TODO: add the recipe to the user's recipesUsed
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
// Get Recent Posts TODO: update this to n recent posts
router.get('/post/recent', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(5).populate('user').populate('recipe').populate('ratings');
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
    const { caption, user, recipe } = req.body;  // Assuming 'recipe' is optional based on your schema.

    // Ensure the user ID is provided (User existence check could also be added here if necessary)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID must be provided"
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

// Create Rating
router.post('/rating/create', async (req, res) => {
  try {
    // Extract rating data from the request body
    const { user, recipe, post, score, comment } = req.body;

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

    // Optional: Update referenced post and recipe with new rating ID
    // Assuming that `Rating` schema's pre-save middleware handles this

    res.status(201).json({
      success: true,
      message: 'Rating created successfully',
      data: rating
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


// TODO: POST for user settings
// router.get('/getUserDietAllergies/:id', async (req, res) => {
//   try {
//       const dietAllergies = await getUserDietAllergies(req.params.id);
//       res.json(dietAllergies);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });

// router.get('/getPostBefore', async (req, res) => {
//   try {
//       // Convert the time string to a Date object from the request query
//       const time = new Date(req.query.time);

//       // Find posts that were created before the specified time
//       const posts = await Post.find({
//           createdAt: { $lt: time }
//       })
//       .sort({ createdAt: -1 })
//       .limit(3)
//       .populate({
//           path: 'recipe',  // Return all fields for the recipe
//       })
//       .populate({
//           path: 'ratings',
//           populate: {
//               path: 'user',
//               model: 'User',
//               select: '_id username'  // Selecting only the username for efficiency
//           }
//       })
//       .exec();

//       // Map posts to a new structure, including async score calculation and timestamps
//       const processedPosts = await Promise.all(posts.map(async post => ({
//           postId: post._id,
//           recipe: post.recipe,
//           caption: post.caption,
//           Score: await post.score,  
//           createdAt: post.createdAt,
//           updatedAt: post.updatedAt,
//           ratings: post.ratings.map(rating => ({
//               userId: rating.user ? rating.user._id : null,
//               username: rating.user ? rating.user.username : 'Unknown',
//               score: rating.score,
//               comment: rating.comment,
//               createdAt: rating.createdAt,
//               updatedAt: rating.updatedAt
//           }))
//       })));

//       // Send the processed posts back as the response
//       res.json(processedPosts);
//   } catch (error) {
//       console.error('Error fetching posts:', error);
//       res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;

