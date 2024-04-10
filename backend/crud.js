require('dotenv').config( { path: '../backend/.env' } )
const User = require('./models/User'); // Adjust the path as needed
const Recipe = require('./models/Recipe');
const Post = require('./models/Post');
const Rating = require('./models/Rating');

/**
 * Creates a new user in the database.
 * @param {Object} userData The data of the user to create.
 */
const createUser = async (userData) => {
    try {
        // Create a new User instance with the provided data
        const user = new User(userData);

        // Save the user to the database
        await user.save();
        console.log('User created successfully:', user);
        return user; // Return the created user
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error; // Re-throw the error for caller to handle
    }
};

const createRecipe = async (recipeData) => {
    try {
        const recipe = new Recipe(recipeData);

        await recipe.save();
        console.log('Recipe saved successfully:',recipe);
        return recipe;
    } catch (error) {
        console.error('Failed to create recipe: ', error);
        throw error;
    }
};

const createPost = async (postData) => {
    try {
        const post = new Post(postData);
        await post.save();
        console.log('Post saved successfully:',post);
        return post;
    } catch (error) {
        console.error('Failed to create post: ', error);
        throw error;
    }
};

const createRating = async (ratingData) => {
    try{
        const rating = new Rating(ratingData);
        await rating.save();
        console.log('Rating saved successfully:',rating);
        return rating;
    } catch (error){
        console.error('Failed to create rating: ', error);
        throw error;
    }
}



module.exports = { createUser, createRecipe, createPost, createRating }; 

