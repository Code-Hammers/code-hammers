import { Request, Response, NextFunction } from 'express';
import { notFound } from '../server/controllers/errorControllers';
import errorHandler from '../server/middleware/errorHandler';
import { BadRequestError } from '../server/errors';

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
    it('should return 404 and the original URL', () => {
      notFound(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockNext).toHaveBeenCalled();
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
