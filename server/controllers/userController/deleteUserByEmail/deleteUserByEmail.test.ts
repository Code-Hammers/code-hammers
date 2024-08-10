import app from '../../../app';
import request, { Response } from 'supertest';
import User from '../../../models/userModel';

const testEmail = 'john.doe@codehammers.com';
const nonExistentEmail = 'nonexistent@codehammers.com';
const testPassword = 'password123';

const createUser = async () => {
  const user = await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: testEmail,
    password: testPassword,
  });
  return user;
};

const loginAndGetCookie = async () => {
  const response = await request(app)
    .post('/api/users/login')
    .send({ email: testEmail, password: testPassword });
  return response.headers['set-cookie'];
};

describe('Tests for userController.deleteUserByEmail', () => {
  const baseUrl = '/api/users';

  describe('Delete User By Email Failure Tests', () => {
    let authCookie: string;

    beforeEach(async () => {
      await User.deleteMany();
      await createUser();
      authCookie = await loginAndGetCookie();
    });

    it('🧪 Fails if user is not found', async () => {
      const response = await request(app)
        .delete(`${baseUrl}/${nonExistentEmail}`)
        .set('Cookie', authCookie)
        .send();

      expect(response.status).toEqual(404);
      expect(response.body[0].message).toEqual('Not Found');
    });
  });

  describe('Delete User By Email Success Tests', () => {
    let successResponse: Response;
    let authCookie: string;

    beforeEach(async () => {
      await User.deleteMany();
      const user = await createUser();
      console.log('user: ', user);
      console.log('user email: ', user.email);
      console.log('test email: ', testEmail);
      authCookie = await loginAndGetCookie();
    });

    it('🧪 Deletes the user successfully with a 200 status', async () => {
      successResponse = await request(app)
        .delete(`${baseUrl}/${testEmail}`)
        .set('Cookie', authCookie)
        .send();

      expect(successResponse.status).toEqual(200);
      expect(successResponse.body.msg).toEqual('User successfully deleted!');

      const user = await User.findOne({ email: testEmail });
      expect(user).toBeNull();
    });
  });
});
