import { Request, Response, NextFunction } from "express";
import {
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
} from "../server/controllers/profileController";
import Profile from "../server/models/profileModel";

jest.mock("../server/models/profileModel", () => ({
  fineOneAndUpdate: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("Profile Controller Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
  });

  describe("createProfile function", () => {
    it("should handle profile creation", async () => {
      (Profile.create as jest.Mock).mockResolvedValue({
        _id: "someId",
        bio: "I am Code",
        job: {
          title: "Senior Developer",
          company: "ACME Corp.",
          description: "Working on various projects...",
          date: "2021-04-07T00:00:00.000Z",
        },
        socials: {
          linkedIn: "https://www.linkedin.com/in/yourprofile",
          github: "https://github.com/yourprofile",
          twitter: "https://twitter.com/yourprofile",
          facebook: "https://www.facebook.com/yourprofile",
          instagram: "https://www.instagram.com/yourprofile",
        },
      });

      mockRequest.body = {
        user: "65117c94f000c9930ef5c0ee",
        bio: "I am Code",
        job: {
          title: "Senior Developer",
          company: "ACME Corp.",
          description: "Working on various projects",
          date: "2021-04-07T00:00:00.000Z",
        },
        socials: {
          linkedIn: "https://www.linkedin.com/in/yourprofile",
          github: "https://github.com/yourprofile",
          twitter: "https://twitter.com/yourprofile",
          facebook: "https://www.facebook.com/yourprofile",
          instagram: "https://www.instagram.com/yourprofile",
        },
      };

      await createProfile(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: "someId",
          bio: "I am Code",
          job: {
            title: "Senior Developer",
            company: "ACME Corp.",
            description: "Working on various projects...",
            date: "2021-04-07T00:00:00.000Z",
          },
          socials: {
            linkedIn: "https://www.linkedin.com/in/yourprofile",
            github: "https://github.com/yourprofile",
            twitter: "https://twitter.com/yourprofile",
            facebook: "https://www.facebook.com/yourprofile",
            instagram: "https://www.instagram.com/yourprofile",
          },
        })
      );
    });
  });
});
