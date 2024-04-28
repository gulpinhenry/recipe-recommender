const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../test-server.js'); 
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.js'); 
const User = require('../models/User.js');

describe('Recipe Endpoints', () => {
  let userData, user;

  beforeEach(async () => {
    await Recipe.deleteMany({});
    await User.deleteMany({});

    userData = {
      username: 'recipeuser',
      email: 'recipeuser@example.com',
      password: 'password123'
    };

    user = await new User(userData).save();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('POST /recipe/create', () => {
    it('should create a new recipe', async () => {
      const res = await request(app)
        .post('/recipe/create')
        .send({
          name: 'Chocolate Cake',
          ingredients: ['Chocolate', 'Flour', 'Sugar'],
          instructions: 'Mix ingredients and bake',
          calories: 500,
          foodCategories: ['Dessert'],
          username: userData.username
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.include.keys('name', 'ingredients', 'instructions');
      expect(res.body.message).to.equal('Recipe created successfully');
    });

    it('should add the recipe to user\'s recipesUsed', async () => {
      const recipeName = 'Unique Salad';
      await request(app)
        .post('/recipe/create')
        .send({
          name: recipeName,
          ingredients: ['Lettuce', 'Tomato', 'Cucumber'],
          instructions: 'Mix all ingredients',
          username: userData.username
        });

      const updatedUser = await User.findOne({ username: userData.username }).populate('recipesUsed');
      expect(updatedUser.recipesUsed).to.have.lengthOf(1);
      expect(updatedUser.recipesUsed[0].name).to.equal(recipeName);
    });
  });

  describe('POST /recipe/add', () => {
    it('should add an existing recipe to a user\'s recipesUsed list', async () => {
      const recipe = await new Recipe({
        name: 'Apple Pie',
        ingredients: ['Apples', 'Sugar', 'Pastry'],
        instructions: 'Prepare and bake'
      }).save();

      const res = await request(app)
        .post('/recipe/add')
        .send({
          username: userData.username,
          recipe_id: recipe._id
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.message).to.equal('Recipe added to user successfully');
    });

    it('should return 404 if the recipe or user does not exist', async () => {
      const nonExistingRecipeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post('/recipe/add')
        .send({
          username: 'nonexistentuser',
          recipe_id: nonExistingRecipeId
        });

      expect(res.status).to.equal(404);
      expect(res.body.success).to.equal(false);
    });
  });

});
