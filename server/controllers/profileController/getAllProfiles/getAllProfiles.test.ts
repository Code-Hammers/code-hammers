import request from 'supertest';
import app from '../../../app';
import Profile from '../../../models/profileModel';
import User from '../../../models/userModel';

const testEmail1 = 'john.doe@codehammers.com';
const testEmail2 = 'jane.doe@codehammers.com';
const testPassword = 'password123';

const createUser = async (email: string) => {
  const user = await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: email,
    password: testPassword,
  });
  return user;
};

const loginAndGetCookie = async () => {
  const response = await request(app)
    .post('/api/users/login')
    .send({ email: testEmail1, password: testPassword });
  return response.headers['set-cookie'];
};

const createProfile = async (userId: string, profilePhoto: string | null = null) => {
  const profile = await Profile.create({
    user: userId,
    firstName: 'John',
    lastName: 'Doe',
    email: profilePhoto ? testEmail1 : testEmail2,
    profilePhoto,
    cohort: 'ECRI 44',
    graduationYear: 2022,
  });
  return profile;
};
//TODO Build this test with S3 mocks to avoid pinging the service every time the test is run.
describe('Tests for profileController.getAllProfiles', () => {
  const baseUrl = '/api/profiles';
  let authCookie: string;

  beforeEach(async () => {
    await User.deleteMany();
    await Profile.deleteMany();
    const user1 = await createUser(testEmail1);
    const user2 = await createUser(testEmail2);
    authCookie = await loginAndGetCookie();
    await createProfile(user1._id.toString(), 'photo.jpg');
    await createProfile(user2._id.toString(), null);
  });

  describe('Get All Profiles Success Tests', () => {
    it('🧪 Retrieves all profiles successfully with a 200 status and processes S3 URLs', async () => {
      const response = await request(app).get(baseUrl).set('Cookie', authCookie).send();

      expect(response.status).toEqual(201);
      expect(response.body.length).toEqual(2);

      expect(response.body[0].firstName).toEqual('John');
      expect(response.body[0].email).toEqual(testEmail1);
      if (response.body[0].profilePhoto) {
        expect(response.body[0].profilePhoto).toContain('https://s3.amazonaws.com/');
      }

      expect(response.body[1].firstName).toEqual('John');
      expect(response.body[1].email).toEqual(testEmail2);
      expect(response.body[1].profilePhoto).toBeNull();
    });
  });

  describe('Get All Profiles Failure Tests', () => {
    beforeEach(async () => {
      await Profile.deleteMany();
    });

    it('🧪 Fails when no profiles are found, returning a 404 status', async () => {
      const response = await request(app).get(baseUrl).set('Cookie', authCookie).send();

      expect(response.status).toEqual(404);
      expect(response.body[0].message).toEqual('Not Found');
    });
  });
});
