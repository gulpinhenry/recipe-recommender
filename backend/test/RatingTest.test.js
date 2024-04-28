const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../test-server'); 
const mongoose = require('mongoose');
const Rating = require('../models/Rating');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Post = require('../models/Post');

describe('Rating Endpoints', () => {
  let userData, recipeData, postData, user, recipe, post;

  beforeEach(async () => {
    await Rating.deleteMany({});
    await User.deleteMany({});
    await Recipe.deleteMany({});
    await Post.deleteMany({});

    userData = {
      username: 'rateuser',
      email: 'rateuser@example.com',
      password: 'password123'
    };
    recipeData = {
      name: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: 'Mix and cook',
      calories: 300
    };
    postData = {
      caption: 'Test Post',
    };

    user = await new User(userData).save();
    recipe = await new Recipe(recipeData).save();
    post = await new Post({...postData, user: user._id, recipe: recipe._id}).save();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('POST /rating/create', () => {
    it('should create a new rating', async () => {
      const res = await request(app)
        .post('/rating/create')
        .send({
          username: userData.username,
          recipename: recipeData.name,
          post_id: post._id,
          score: 4,
          comment: 'Great recipe!'
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.include.keys('score', 'comment');
      expect(res.body.message).to.equal('Rating created successfully');
    });

    it('should return error if required fields are missing', async () => {
      const res = await request(app)
        .post('/rating/create')
        .send({
          username: userData.username,
          score: 5
        });

      expect(res.status).to.equal(400);
    });
  });

  describe('GET /rating/post/:id', () => {
    it('should retrieve ratings for a specific post', async () => {
      await new Rating({
        user: user._id,
        recipe: recipe._id,
        post: post._id,
        score: 5,
        comment: 'Excellent!'
      }).save();

      const res = await request(app)
        .get(`/rating/post/${post._id}`)
        .send();

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.be.an('array').that.is.not.empty;
    });

    it('should return 500 if post ID is invalid', async () => {
      const invalidPostId = '123'; 
      const res = await request(app)
        .get(`/rating/post/${invalidPostId}`)
        .send();

      expect(res.status).to.equal(500);
    });
  });

});
