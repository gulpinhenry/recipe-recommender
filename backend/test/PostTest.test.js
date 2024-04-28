const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../test-server.js');
const mongoose = require('mongoose');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const Recipe = require('../models/Recipe.js');

describe('Post Endpoints', () => {
  let userData, recipeData, user, recipe;

  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    await Recipe.deleteMany({});

    userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    };
    recipeData = {
      name: 'testrecipe',
      ingredients: ['ingredient1', 'ingredient2'],
      instructions: 'Mix ingredients',
      calories: 250
    };

    user = await new User(userData).save();
    recipe = await new Recipe(recipeData).save();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('POST /post/create', () => {
    it('should create a post', async () => {
      const res = await request(app)
        .post('/post/create')
        .send({
          caption: 'A new test post',
          username: userData.username,
          recipename: recipeData.name
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.include.keys('caption', 'user', 'recipe');
      expect(res.body.message).to.equal('Post created successfully');
    });

    it('should not create a post with non-existing user or recipe', async () => {
      const res = await request(app)
        .post('/post/create')
        .send({
          caption: 'Another post',
          username: 'nonexistinguser',
          recipename: 'nonexistingrecipe'
        });

      expect(res.status).to.equal(404);
    });
  });

  describe('GET /post/:id', () => {
    it('should retrieve a post by ID', async () => {
      const post = await new Post({
        caption: 'Test post',
        user: user._id,
        recipe: recipe._id
      }).save();

      const res = await request(app)
        .get(`/post/${post._id}`)
        .send();

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.have.property('caption', 'Test post');
    });

    it('should return 404 for a non-existing post', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/post/${nonExistingId}`)
        .send();

      expect(res.status).to.equal(404);
    });
  });

});
