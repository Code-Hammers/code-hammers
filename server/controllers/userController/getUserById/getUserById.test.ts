import app from '../../../app';
import request, { Response } from 'supertest';
import User from '../../../models/userModel';
import { IUser } from '../../../types/user';

const testUserId = 'testUserId123';
const invalidUserId = 'invalidUserId123';
const nonExistentUserId = '5f8f8c44b54764421b7156c4';

const createUser = async () => {
  const user = await User.create({
    _id: testUserId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@codehammers.com',
    password: 'password123',
  });
  return user;
};

describe('Tests for userController.getUserById', () => {
  const baseUrl = '/api/users';

  describe('Get User By Id Failure Tests', () => {
    beforeEach(async () => {
      await User.deleteMany();
    });

    it('🧪 Fails if userId is invalid', async () => {
      const response = await request(app).get(`${baseUrl}/${invalidUserId}`).send();

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual('User not found!');
    });

    it('🧪 Fails if user is not found', async () => {
      const response = await request(app).get(`${baseUrl}/${nonExistentUserId}`).send();

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual('User not found!');
    });
  });

  describe('Get User By Id Success Tests', () => {
    let successResponse: Response;

    beforeEach(async () => {
      await User.deleteMany();
      await createUser();
      successResponse = await request(app).get(`${baseUrl}/${testUserId}`).send();
    });

    it('🧪 Retrieves the user successfully with a 200 status', async () => {
      expect(successResponse.status).toEqual(200);
      expect(successResponse.body._id).toEqual(testUserId);
      expect(successResponse.body.email).toEqual('john.doe@codehammers.com');
    });
  });
});
