const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../test-server.js');
const mongoose = require('mongoose');
const User = require('../models/User.js');

describe('User Endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('POST /user/create', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/user/create')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.include.keys('username', 'email');
    });

    it('should not create a user with an existing username', async () => {
      await new User({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'password123'
      }).save();

      const res = await request(app)
        .post('/user/create')
        .send({
          username: 'existinguser',
          email: 'newuser@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(500);
    });
  });

  describe('GET /user/username/:username', () => {
    it('should get a user by username', async () => {
      // Insert user for retrieval
      await new User({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      }).save();

      const res = await request(app)
        .get('/user/username/newuser')
        .send();

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.have.property('username', 'newuser');
    });

    it('should return 404 for a non-existing user', async () => {
      const res = await request(app)
        .get('/user/username/nonexistentuser')
        .send();

      expect(res.status).to.equal(404);
      expect(res.body.success).to.equal(false);
    });
  });

  describe('POST /user/login', () => {
    it('should authenticate an existing user', async () => {
      // Insert user for authentication
      await new User({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      }).save();

      const res = await request(app)
        .post('/user/login')
        .send({
          username: 'newuser',
          password: 'password123'
        });

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });

    it('should reject login with incorrect password', async () => {
      await new User({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      }).save();

      const res = await request(app)
        .post('/user/login')
        .send({
          username: 'newuser',
          password: 'wrongpassword'
        });

      expect(res.status).to.equal(401);
      expect(res.body.success).to.equal(false);
    });
  });

});
