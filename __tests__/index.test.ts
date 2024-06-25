import request from 'supertest';
import { startServer } from '../server/index';
import app from '../server/app';
import { Server } from 'http';
import mongoose from 'mongoose';

// TODO
/*eslint jest/no-disabled-tests: "off"*/

let server: Server;

beforeEach(async () => {
  server = await startServer();
});

afterEach((done) => {
  if (server) {
    server.close(() => {
      done();
    });
  } else {
    done();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Endpoints', () => {
  xit('should get the API Running message in development', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'API Running - Hazzah!');
  });

  xit('should serve the frontend files in production', async () => {
    process.env.NODE_ENV = 'production';

    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);

    expect(res.headers['content-type']).toContain('text/html');
  });

  xit('should catch all routes and serve the frontend in production', async () => {
    process.env.NODE_ENV = 'production';
    const res = await request(app).get('/nonexistentroute');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toContain('text/html');
  });
});

describe('Server Start-Up', () => {
  it('should start up the server if required as main module', async () => {
    const originalLog = console.log;
    const logCalls: string[] = [];
    console.log = jest.fn((...args: string[]) => {
      logCalls.push(args.join(' '));
    });

    jest.resetModules();

    await new Promise((resolve) => {
      if (server) {
        server.on('listening', resolve);
      }
    });

    const hasExpectedLog = logCalls.some((log) => log.includes('Server running in'));
    expect(hasExpectedLog).toBe(true);

    console.log = originalLog;
  });
});
