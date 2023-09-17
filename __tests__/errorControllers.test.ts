import request from 'supertest';
import express, { Request, Response } from 'express';
import { notFound, errorHandler } from '../server/controllers/errorControllers';

const app = express();

app.use('/error', (req: Request, res: Response) => {
  throw new Error('Intentional Error');
});

app.use(notFound);
app.use(errorHandler);

describe('Error Handlers', () => {

  describe('notFound', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/nonexistentroute');
      expect(res.statusCode).toEqual(404);
      expect(res.body.message.err).toEqual(`Not found - /nonexistentroute`);
    });
  });

  describe('errorHandler', () => {
    it('should handle intentional errors', async () => {
      const res = await request(app).get('/error');
      expect(res.statusCode).toEqual(400);  // Default error code in your handler
      expect(res.body.message.err).toEqual("An error occurred");
      if (process.env.NODE_ENV !== "production") {
        expect(res.body.stack).toBeDefined();
      } else {
        expect(res.body.stack).toBeNull();
      }
    });
  });

});
