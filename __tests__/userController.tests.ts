import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  authUser,
  getUserById,
  deleteUserByEmail,
} from "../server/controllers/userController";
import User from "../server/models/userModel";

require("dotenv").config();

console.log("env working...", process.env.JWT_SECRET);

jest.mock("../server/models/userModel");
jest.mock("../server/utils/generateToken", () => {
  return () => "someFakeToken";
});

describe("User Controller Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    mockNext = jest.fn();
  });

  describe("registerUser function", () => {
    it("should handle user registration", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        _id: "someId",
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
      });

      // MOCKING USER CREATE TO RETURN A DUMMY USER OBJECT
      User.create = jest.fn().mockResolvedValue({
        _id: "someId",
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
      });

      mockRequest.body = {
        name: "John",
        email: "john@example.com",
        password: "password",
      };

      await registerUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("authUser function", () => {
    it("should handle user authentication", async () => {
      // MOCKING USER>FINDONE TO RETURN A DUMMY USER
      User.findOne = jest.fn().mockResolvedValue({
        _id: "someId",
        name: "John",
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

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("getUserById function", () => {
    it("should get a user by ID", async () => {
      // MOCKING USER.FINDONE TO RETURN A DUMMY USER
      User.findOne = jest.fn().mockResolvedValue({
        _id: "someId",
        name: "John",
        email: "john@example.com",
      });

      mockRequest.params = { userId: "someId" };

      await getUserById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("deleteUserByEmail function", () => {
    it("should delete a user by email", async () => {
      // MOCK USE.FINDONEANDREMOVE TO IMITATE SUCCESSFUL DELETE
      User.findOneAndRemove = jest.fn().mockResolvedValue(true);

      mockRequest.params = { email: "john@example.com" };

      await deleteUserByEmail(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });
  });
});
