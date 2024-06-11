import app from '../server/index';
import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import errorHandler from '../server/middleware/errorHandler';
import { BadRequestError, NotFoundError } from '../server/errors';

describe('Middleware Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('notFound Middleware', () => {
    it('should return 404 and the original URL', async () => {
      const exampleNotFoundError = new NotFoundError();

      const response = await request(app).get('/non-existent-route').send();

      expect(response.status).toEqual(404);
      expect(response.body).toEqual(exampleNotFoundError.serializeErrors());
    });
  });

  describe('errorHandler Middleware', () => {
    it('should handle the error correctly', () => {
      const mockError = new BadRequestError('Some error');
      errorHandler(mockError, mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining([
          {
            message: expect.any(String),
          },
        ]),
      );
    });
  });
});
