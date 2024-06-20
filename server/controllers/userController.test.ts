import app from '../app';
import request from 'supertest';
import { IGraduateInvitation } from '../types/graduateInvitation';
import GraduateInvitation from '../models/graduateInvitationModel';
import User from '../models/userModel';
import Profile from '../models/profileModel';
import { BadRequestError } from '../errors';

const testEmail = 'tester@codehammers.com';
const testPassword = 'ilovetesting';
const testToken = 'testToken';

describe('Test for userController.registerUser', () => {
  let validInvite: IGraduateInvitation;

  beforeEach(async () => {
    validInvite = await GraduateInvitation.create({
      email: testEmail,
      token: testToken,
      tokenExpiry: new Date(Date.now() + 1000 * 60),
      isRegistered: false,
      firstName: 'Homer',
      lastName: 'Simpson',
      cohort: 'ECRI 44',
      lastEmailSent: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    });
  });

  afterEach(async () => {
    await GraduateInvitation.deleteMany();
    await User.deleteMany();
    await Profile.deleteMany();
  });

  it('Fails if email is invalid', async () => {
    const cookie = await login();
    console.log('🍪🍪🍪', cookie);

    const response = await request(app)
      .post(`/api/users/register?token=${validInvite.token}`)
      .send({
        email: 'thisaintanemail',
        password: testPassword,
      });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(new BadRequestError('Invalid Email').serializeErrors());
  });
});
