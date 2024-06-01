import { Request, Response, NextFunction } from 'express';
import { notFound, errorHandler } from '../server/controllers/errorControllers';

describe('Middleware Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
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
      const mockError = new Error('Some error');
      errorHandler(mockError, mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.anything(),
          stack: expect.any(String),
        }),
      );
    });
  });
});
