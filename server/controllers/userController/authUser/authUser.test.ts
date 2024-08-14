import app from '../../../app';
import request, { Response } from 'supertest';
import User from '../../../models/userModel';
import { NotAuthorizedError } from '../../../errors';

const testEmail = 'tester@codehammers.com';
const testPassword = 'ilovetesting';

const createUser = async () => {
  const user = await User.create({
    firstName: 'Test',
    lastName: 'User',
    email: testEmail,
    password: testPassword,
  });
  return user;
};

describe('Tests for userController.authUser', () => {
  const baseUrl = '/api/users/login';
  describe('Auth Failure Tests', () => {
    beforeEach(async () => {
      await User.deleteMany();
    });

    it('🧪 Fails if invalid email is provided', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ email: 'invalid-email', password: testPassword });

      expect(response.status).toEqual(400);
      expect(response.body[0].message).toEqual('Please enter a valid email');
      expect(response.body[0].field).toEqual('email');
    });

    it('🧪 Fails if no email is provided', async () => {
      const response = await request(app).post(baseUrl).send({ password: testPassword });

      expect(response.status).toEqual(400);
      expect(response.body[0].message).toEqual('You must enter an email');
      expect(response.body[0].field).toEqual('email');
    });

    it('🧪 Fails if no password is provided', async () => {
      const response = await request(app).post(baseUrl).send({ email: testEmail });

      expect(response.status).toEqual(400);
      expect(response.body[0].message).toEqual('You must enter a password');
      expect(response.body[0].field).toEqual('password');
    });

    it('🧪 Fails if user does not exist', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ email: testEmail, password: testPassword });

      expect(response.status).toEqual(401);
      expect(response.body).toEqual(new NotAuthorizedError().serializeErrors());
    });

    it('🧪 Fails if password is incorrect', async () => {
      await createUser();
      const response = await request(app)
        .post(baseUrl)
        .send({ email: testEmail, password: 'wrongpassword' });

      expect(response.status).toEqual(401);
      expect(response.body).toEqual(new NotAuthorizedError().serializeErrors());
    });
  });

  describe('Auth Success Tests', () => {
    let successResponse: Response;

    beforeEach(async () => {
      await User.deleteMany();
      await createUser();
      successResponse = await request(app)
        .post(baseUrl)
        .send({ email: testEmail, password: testPassword });
    });

    it('🧪 Authenticates and sends back the user with a 200 status', async () => {
      expect(successResponse.status).toEqual(200);
      expect(successResponse.body.email).toEqual(testEmail);
    });

    it('🧪 Sends back a cookie with a token', async () => {
      const cookie = successResponse.get('Set-Cookie') as string[];
      expect(cookie[0].split('=')[0]).toEqual('token');
    });
  });
});
