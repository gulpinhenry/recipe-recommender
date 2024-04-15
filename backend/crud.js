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
        console.log('Post saved successfully:', post);
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
        console.log('Rating saved successfully:', rating);
        return rating;
    } catch (error){
        console.error('Failed to create rating: ', error);
        throw error;
    }
}

const deletePost = async (postID) => {
    try {
        const post = await Post.findById(postID);
        post.deleteOne();
        console.log('Post deleted successfully.')
        return true;
    } catch (error){
        console.error('Failed to delete post: ', error);
        throw error;
    }
}

const getUserDietAllergies = async (userID) => {
    try {
        const user = await User.findById(userID);
        return user.dietAllergy;
    } catch (error){
        console.error('Failed to fetch user diet allergies:', error)
        throw error;
    }
}

async function getPostBefore(timeString) {
    try {
        // Convert the time string to a Date object
        const time = new Date(timeString);

        const posts = await Post.find({
            createdAt: { $lt: time }
        })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate({
            path: 'recipe',  // Return all fields for the recipe
        })
        .populate({
            path: 'ratings',
            populate: {
                path: 'user',
                model: 'User',
                select: '_id username'  // Selecting only the username for efficiency
            }
        })
        .exec();

        // Map posts to a new structure, including async score calculation and timestamps
        return Promise.all(posts.map(async post => ({
            postId: post._id,
            recipe: post.recipe,  
            caption: post.caption,
            Score: await post.score,  
            createdAt: post.createdAt,  
            updatedAt: post.updatedAt, 
            ratings: post.ratings.map(rating => ({
                userId: rating.user ? rating.user._id : null,
                username: rating.user ? rating.user.username : 'Unknown',  
                score: rating.score,
                comment: rating.comment,
                createdAt: rating.createdAt,  
                updatedAt: rating.updatedAt  
            }))
        })));
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}






module.exports = { createUser, createRecipe, createPost, createRating, deletePost, getUserDietAllergies, getPostBefore }; 

