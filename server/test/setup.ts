import mongoose from 'mongoose';
import app from '../app';
import request from 'supertest';
import User from '../models/userModel';
import { pool } from '../config/sql-db';

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

  await pool.query(`
    DO
    $$
    DECLARE
        table_name text;
    BEGIN
        FOR table_name IN
            SELECT tablename
            FROM pg_tables
            WHERE schemaname = 'public'
        LOOP
            EXECUTE format('TRUNCATE TABLE %I CASCADE;', table_name);
        END LOOP;
    END
    $$;
   `);
});

afterAll(async () => {
  await mongoose.connection.close();
  pool.end();
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
