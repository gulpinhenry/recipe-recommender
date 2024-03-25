require('dotenv').config();
const circle = require('./models.js');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const client = new MongoClient(process.env.MONGO_DB_TEST, { useUnifiedTopology: true });
let db;

async function connectDB() {
    await client.connect();
    db = client.db('Recipe_Recommender');
}

async function createUser(userData) {
    if (!userData.username) {
        return { "error": "No username provided" };
    }
    if (userData.password.length < 5) {
        return { "error": "Password must be at least 5 characters" };
    }

    const hashedPassword = bcrypt.hashSync(userData.password);
    userData.password = hashedPassword;

    const usersCollection = db.collection('users');

    try {
        const existingUser = await usersCollection.findOne({
            "$or": [
                { "email": userData.email },
                { "username": userData.username }
            ]
        });

        if (existingUser) {
            if (existingUser.email === userData.email) {
                return { "error": "A user with this email already exists." };
            } else {
                return { "error": "A user with this username already exists." };
            }
        }

        const result = await usersCollection.insertOne(userData);
        return { "_id": result.insertedId.toString() };
    } catch (error) {
        if (error.code === 11000) {
            return { "error": "A user with this username or email already exists." };
        }
        throw error;
    }
}

async function loginUser(loginData) {
    const user = await db.collection('users').findOne({ "email": loginData.email });

    if (user) {
        const isMatch = bcrypt.compareSync(loginData.password, user.password);
        if (isMatch) {
            return { "status": "success", "message": "Login successful", "_id": user._id.toString() };
        } else {
            return { "status": "error", "message": "Invalid username or password" };
        }
    } else {
        return { "status": "error", "message": "User not found" };
    }
}

// Placeholder for createRecipe and getRecipeById, implement according to your requirements.
async function createRecipe(recipeData) {
    // Implementation logic here
}

async function getRecipeById(recipeId) {
    // Implementation logic here
}

// Connect to the database upon script execution
connectDB().catch(console.error);

// Exporting the functions if this module is used in a larger application
module.exports = { createUser, loginUser, createRecipe, getRecipeById };
