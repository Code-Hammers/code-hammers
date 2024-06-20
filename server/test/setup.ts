import mongoose from 'mongoose';
import app from '../app';
import request from 'supertest';
import User from '../models/userModel';

declare global {
  function login(): Promise<string[] | undefined>;
}

const testUserEmail = 'theDude@Duderino.com';
const testUserPassword = 'jackieTreehorn';

beforeAll(async () => {
  console.log('⚡️ Jest Setup: beforeAll');

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
  console.log('⚡️ Jest Setup: beforeEach');
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  console.log('⚡️ Jest Setup: afterAll');
  await mongoose.connection.close();
});

global.login = async () => {
  console.log('⚡️ Global Login');
  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: testUserEmail,
      password: testUserPassword,
    })
    .expect(200);

  const cookie = response.get('Set-Cookie');
  console.log(cookie);

  return cookie;
};
