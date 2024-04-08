require('dotenv').config( { path: '../backend/.env' } )
const User = require('./models/User'); // Adjust the path as needed

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

module.exports = { createUser }; 

