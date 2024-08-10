import app from '../../../app';
import request, { Response } from 'supertest';
import User from '../../../models/userModel';

const invalidUserId = 'invalidUserId123';
const nonExistentUserId = '5f8f8c44b54764421b7156c4';
const testEmail = 'john.doe@codehammers.com';
const testPassword = 'password123';

const createUser = async () => {
  const user = await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@codehammers.com',
    password: 'password123',
  });
  return user;
};

const loginAndGetCookie = async () => {
  const response = await request(app)
    .post('/api/users/login')
    .send({ email: testEmail, password: testPassword });
  return response.headers['set-cookie'];
};

describe('Tests for userController.getUserById', () => {
  const baseUrl = '/api/users';

  describe('Get User By Id Failure Tests', () => {
    let authCookie: string;

    beforeEach(async () => {
      await User.deleteMany();
      await createUser();
      authCookie = await loginAndGetCookie();
    });

    it('🧪 Fails if userId is invalid', async () => {
      const response = await request(app)
        .get(`${baseUrl}/${invalidUserId}`)
        .set('Cookie', authCookie)
        .send();

      expect(response.status).toEqual(400);
      expect(response.body[0].message).toEqual('Invalid user ID format');
      expect(response.body[0].field).toEqual('user ID');
    });

    it('🧪 Fails if user is not found', async () => {
      const response = await request(app)
        .get(`${baseUrl}/${nonExistentUserId}`)
        .set('Cookie', authCookie)
        .send();

      expect(response.status).toEqual(404);
      expect(response.body[0].message).toEqual('Not Found');
    });
  });

  describe('Get User By Id Success Tests', () => {
    let successResponse: Response;
    let authCookie: string;

    it('🧪 Retrieves the user successfully with a 200 status', async () => {
      await User.deleteMany();
      const user = await createUser();
      authCookie = await loginAndGetCookie();
      successResponse = await request(app)
        .get(`${baseUrl}/${user.id}`)
        .set('Cookie', authCookie)
        .send();
      expect(successResponse.status).toEqual(200);
      expect(successResponse.body._id).toEqual(user.id);
      expect(successResponse.body.email).toEqual('john.doe@codehammers.com');
    });
  });
});
