// server/routes/userRoutes.test.js

jest.mock('../index', () => {
    const express = require('express');
    const userRoutes = require('../routes/userRoutes.js');
    const app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes);
    return app;
  }, { virtual: true });
  
  jest.mock('../config/db.js', () => jest.fn());
  
  jest.mock('../middleware/errorMiddleware.js', () => {
    return {
      notFound: (req, res, next) => next(),
      errorHandler: (err, req, res, next) => next(),
    };
  });
  
  const User = require('../models/userModel.js');
  jest.mock('../models/userModel.js');
  
  const request = require('supertest');
  const app = require('../index');
  
  describe('User Routes', () => {
    describe('User Routes', () => {
        describe('POST /api/users/login', () => {
          test('should authenticate user and get token', async () => {
            User.findOne.mockResolvedValueOnce({
              matchPassword: () => Promise.resolve(true),
              _id: 'testId',
              name: 'testName',
              email: 'testEmail@example.com', // Changed to a valid email
              isAdmin: false,
              token: 'testToken',
            });
      
            const res = await request(app)
              .post('/api/users/login')
              .send({ email: 'testEmail@example.com', password: 'testPassword' }); // Changed to a valid email
      
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('email');
          });
        });
      
        describe('POST /api/users', () => {
          test('should register a new user', async () => {
            User.findOne.mockResolvedValueOnce(null);
            User.create.mockResolvedValueOnce({
              _id: 'testId',
              name: 'testName',
              email: 'testEmail@example.com', // Changed to a valid email
              token: 'testToken',
            });
      
            const res = await request(app)
              .post('/api/users')
              .send({ name: 'testName', email: 'testEmail@example.com', password: 'testPassword' }); // Changed to a valid email
      
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('email');
          });
        });
      });
      
  });
  
