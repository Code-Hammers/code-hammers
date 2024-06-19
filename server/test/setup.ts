import mongoose from 'mongoose';
import app from '../app';
import request from 'supertest';
import User from '../models/userModel';

declare global {
  function login(): Promise<string[] | undefined>;
}

const testUserEmail = 'tester@codehammers.com';
const testUserPassword = 'ilovetesting';

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdfasdf';
  await mongoose.connect('mongodb://ch-mongo-test:27017/ch-testdb', {});

  await User.create({
    firstName: 'Sean',
    lastName: 'Kelly',
    email: testUserEmail,
    password: testUserPassword,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

global.login = async () => {
  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: testUserEmail,
      password: testUserPassword,
    })
    .expect(200);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
