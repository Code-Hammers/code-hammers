import mongoose from 'mongoose';
import app from '../app';
import request from 'supertest';
import User from '../models/userModel';

declare global {
  function login(): Promise<string[]>;
}

const testUserEmail = 'theDude@Duderino.com';
const testUserPassword = 'jackieTreehorn';

beforeAll(async () => {
  await mongoose.connect('mongodb://ch-mongo-test:27017/ch-testdb', {});
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
  await User.create({
    firstName: 'Sean',
    lastName: 'Kelly',
    email: testUserEmail,
    password: testUserPassword,
  });

  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: testUserEmail,
      password: testUserPassword,
    })
    .expect(200);

  const cookie = response.get('Set-Cookie') as string[];

  return cookie;
};
