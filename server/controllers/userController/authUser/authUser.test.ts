import app from '../../../app';
import request, { Response } from 'supertest';
import User from '../../../models/userModel';

import { ValidationError, RequestValidationError } from '../../../errors';
import { IUser } from '../../../types/user';

const testEmail = 'tester@codehammers.com';
const testPassword = 'ilovetesting';

// TODO
/*eslint jest/no-disabled-tests: "off"*/

describe('Tests for userController.authUser', () => {
  describe('Auth Failure Tests', () => {
    it('Fails if invalid email is provided', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'invalid-email', password: testPassword });

      expect(response.status).toEqual(400);
      expect(response.body[0].message).toEqual('Please enter a valid email');
      expect(response.body[0].field).toEqual('email');
    });
  });

  describe('Auth Success Tests', () => {
    xit('', async () => {});
  });
});
