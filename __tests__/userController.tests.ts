import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  authUser,
  getUserById,
  deleteUserByEmail,
} from "../server/controllers/userController";
import User from "../server/models/userModel";

jest.mock("../server/models/userModel", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndRemove: jest.fn(),
}));
jest.mock("../server/utils/generateToken", () => () => "someFakeToken");

describe("User Controller Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  //TODO Add some error test for global error handler
  let mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
      cookie: jest.fn().mockReturnThis(),
    };
  });

  describe("registerUser function", () => {
    it("should handle user registration", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue({
        _id: "someId",
        firstName: "John",
        lastName: "Doh",
        email: "john@example.com",
        password: "hashedPassword",
      });

      mockRequest.body = {
        firstName: "John",
        lastName: "Doh",
        email: "john@example.com",
        password: "password",
      };

      await registerUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        _id: "someId",
        firstName: "John",
        lastName: "Doh",
        email: "john@example.com",
      });

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "token",
        "someFakeToken",
        expect.any(Object)
      );
    });
  });

  describe("authUser function", () => {
    it("should handle user authentication", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "someId",
        firstName: "John",
        lastName: "Doh",
        email: "john@example.com",
        password: "hashedPassword",
        matchPassword: jest.fn().mockResolvedValue(true),
      });

      mockRequest.body = { email: "john@example.com", password: "password" };

      await authUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        _id: "someId",
        firstName: "John",
        lastName: "Doh",
        email: "john@example.com",
      });
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "token",
        "someFakeToken",
        expect.any(Object)
      );
    });
  });

  describe("getUserById function", () => {
    it("should get a user by ID", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "someId",
        firstName: "John",
        lastName: "Doh",
        email: "john@example.com",
      });

      mockRequest.params = { userId: "someId" };

      await getUserById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: "someId",
          firstName: "John",
          lastName: "Doh",
          email: "john@example.com",
        })
      );
    });
  });

  describe("deleteUserByEmail function", () => {
    it("should delete a user by email", async () => {
      (User.findOneAndRemove as jest.Mock).mockResolvedValue({
        _id: "someId",
        firstName: "John",
        lastName: "Doh",
        email: "john@example.com",
      });

      mockRequest.params = { email: "john@example.com" };

      await deleteUserByEmail(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          msg: "User successfully deleted!",
        })
      );
    });
  });
});
