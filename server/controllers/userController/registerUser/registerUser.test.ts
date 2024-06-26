import app from '../../../app';
import request, { Response } from 'supertest';
import { IGraduateInvitation } from '../../../types/graduateInvitation';
import GraduateInvitation from '../../../models/graduateInvitationModel';
import User from '../../../models/userModel';
import Profile from '../../../models/profileModel';
import { BadRequestError } from '../../../errors';
import { IUser } from '../../../types/user';
import { IProfile } from '../../../types/profile';

const testEmail = 'tester@codehammers.com';
const testPassword = 'ilovetesting';
const testToken = 'testToken';

const createValidInvite = async () => {
  const invite = await GraduateInvitation.create({
    email: testEmail,
    token: testToken,
    tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
    isRegistered: false,
    firstName: 'Homer',
    lastName: 'Simpson',
    cohort: 'ECRI 44',
    lastEmailSent: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  });
  return invite;
};

describe('Tests for userController.registerUser', () => {
  let validInvite: IGraduateInvitation;
  const baseUrl = '/api/users/register';

  describe('Request failure tests', () => {
    beforeEach(async () => {
      validInvite = await createValidInvite();
    });

    afterEach(async () => {
      await GraduateInvitation.deleteMany();
      await User.deleteMany();
      await Profile.deleteMany();
    });
    it('🧪 Fails if no invitation token is provided', async () => {
      const response = await request(app).post(baseUrl).send({
        email: testEmail,
        password: testPassword,
      });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(new BadRequestError('Invalid token').serializeErrors());
    });

    it('🧪 Fails if password is invalid', async () => {
      const responseOne = await request(app).post(`${baseUrl}?token=${validInvite.token}`).send({
        email: testEmail,
        password: 'short',
      });

      expect(responseOne.status).toEqual(400);
      expect(responseOne.body[0].message).toEqual('Password must be at least 7 characters long');
      expect(responseOne.body[0].field).toEqual('password');

      const responseTwo = await request(app).post(`${baseUrl}?token=${validInvite.token}`).send({
        email: testEmail,
      });

      expect(responseTwo.status).toEqual(400);
      expect(responseTwo.body[0].message).toEqual('Please provide a valid password');
      expect(responseTwo.body[0].field).toEqual('password');
    });

    it('🧪 Fails if email is invalid', async () => {
      const response = await request(app).post(`${baseUrl}?token=${validInvite.token}`).send({
        email: 'thisaintanemail',
        password: testPassword,
      });

      expect(response.status).toEqual(400);
      expect(response.body[0].message).toEqual('Invalid Email');
      expect(response.body[0].field).toEqual('email');
    });

    it('🧪 Fails if no valid invitation found', async () => {
      const response = await request(app).post(`${baseUrl}?token=derp`).send({
        email: 'derp@derp.com',
        password: testPassword,
      });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(new BadRequestError('Invalid invite').serializeErrors());
    });

    it('🧪 Fails if invitation is expired', async () => {
      const expiredEmail = 'expired@old.com';
      const expiredToken = 'oldAssToken';
      const expiredInvite = await GraduateInvitation.create({
        email: expiredEmail,
        token: expiredToken,
        tokenExpiry: new Date(Date.now() - 1000 * 60),
        isRegistered: false,
        firstName: 'Marge',
        lastName: 'Simpson',
        cohort: 'FTRI 99',
        lastEmailSent: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      });

      const response = await request(app).post(`${baseUrl}?token=${expiredInvite.token}`).send({
        email: expiredEmail,
        password: 'ohDidIJoinTooLate',
      });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        new BadRequestError(
          'Token is expired, please reach out to TODO to get a new invitation',
        ).serializeErrors(),
      );
    });

    it('🧪 Fails if user is already registered', async () => {
      const registeredEmail = 'registered@here.com';
      const token = 'token';
      const registeredInvite = await GraduateInvitation.create({
        email: registeredEmail,
        token,
        tokenExpiry: new Date(Date.now() + 1000 * 60 * 60),
        isRegistered: true,
        firstName: 'Lisa',
        lastName: 'Simpson',
        cohort: 'FTRI 99',
        lastEmailSent: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      });

      const response = await request(app).post(`${baseUrl}?token=${registeredInvite.token}`).send({
        email: registeredEmail,
        password: 'ohImAlreadyHere',
      });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        new BadRequestError('Looks like you already registered bub').serializeErrors(),
      );
    });
  });

  describe('Successful request tests', () => {
    let successResponse: Response;
    let invitation: IGraduateInvitation | null;
    let user: IUser | null;
    let profile: IProfile | null;
    beforeAll(async () => {
      validInvite = await createValidInvite();
      successResponse = await request(app)
        .post(`${baseUrl}?token=${validInvite.token}`)
        .send({ email: testEmail, password: testPassword });
      invitation = await GraduateInvitation.findOne({ email: testEmail });
      user = await User.findOne({ email: testEmail });
      profile = await Profile.findOne({ user: user?._id });
    });

    afterAll(async () => {
      await GraduateInvitation.deleteMany();
      await User.deleteMany();
      await Profile.deleteMany();
    });

    it('🧪 Sends back created user with 201', async () => {
      expect(successResponse.status).toEqual(201);
      expect(successResponse.body.email).toEqual(testEmail);
    });

    it('🧪 Updates the GraduateInvitation Document correctly', async () => {
      expect('ggg').toEqual('ggg');
      expect(invitation?.isRegistered).toBe(true);
      expect(invitation?.registeredAt).toBeTruthy();
    });

    it('🧪 Creates the user and profile', async () => {
      expect(user?.lastName).toEqual('Simpson');
      expect(profile?.lastName).toEqual('Simpson');
    });

    it('🧪 Sends back a cookie with a token', async () => {
      const cookie = successResponse.get('Set-Cookie') as string[];
      expect(cookie[0].split('=')[0]).toEqual('token');
    });
  });
});
