require('dotenv').config( { path: '../backend/.env' } )
const mongoose = require('mongoose');
const db = require('../config/connection');
const User = require('../models/User');


// Sample users data
const usersData = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'password123', // In a real app, you'd hash passwords before saving
    tastePreferences: ['spicy', 'salty'],
    dietAllergy: ['peanuts'],
  },
  {
    username: 'jane_doe',
    email: 'jane.doe@example.com',
    password: 'password456', // In a real app, you'd hash passwords before saving
    tastePreferences: ['sweet', 'umami'],
    dietAllergy: ['gluten'],
  }
];

const seedDB = async () => {
  try {
    await db; // Ensure the database connection is established
    await User.deleteMany({}); // Clear existing users
    await User.insertMany(usersData); // Insert new sample users
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after seeding
  }
};

seedDB();
