import { Request, Response, NextFunction } from 'express';
import {
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
} from '../server/controllers/profileController';
import Profile from '../server/models/profileModel';

// TODO
/*eslint jest/no-disabled-tests: "off"*/

jest.mock('../server/models/profileModel', () => ({
  findOneAndUpdate: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
}));

xdescribe('Profile Controller Tests', () => {
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

  describe('createProfile function', () => {
    xit('should handle profile creation', async () => {
      (Profile.create as jest.Mock).mockResolvedValue({
        _id: 'someId',
        bio: 'I am Code',
        job: {
          title: 'Senior Developer',
          company: 'ACME Corp.',
          description: 'Working on various projects...',
          date: '2021-04-07T00:00:00.000Z',
        },
        socials: {
          linkedIn: 'https://www.linkedin.com/in/yourprofile',
          github: 'https://github.com/yourprofile',
          twitter: 'https://twitter.com/yourprofile',
          facebook: 'https://www.facebook.com/yourprofile',
          instagram: 'https://www.instagram.com/yourprofile',
        },
      });

      mockRequest.body = {
        user: '65117c94f000c9930ef5c0ee',
        bio: 'I am Code',
        job: {
          title: 'Senior Developer',
          company: 'ACME Corp.',
          description: 'Working on various projects',
          date: '2021-04-07T00:00:00.000Z',
        },
        socials: {
          linkedIn: 'https://www.linkedin.com/in/yourprofile',
          github: 'https://github.com/yourprofile',
          twitter: 'https://twitter.com/yourprofile',
          facebook: 'https://www.facebook.com/yourprofile',
          instagram: 'https://www.instagram.com/yourprofile',
        },
      };

      await createProfile(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: 'someId',
          bio: 'I am Code',
          job: {
            title: 'Senior Developer',
            company: 'ACME Corp.',
            description: 'Working on various projects...',
            date: '2021-04-07T00:00:00.000Z',
          },
          socials: {
            linkedIn: 'https://www.linkedin.com/in/yourprofile',
            github: 'https://github.com/yourprofile',
            twitter: 'https://twitter.com/yourprofile',
            facebook: 'https://www.facebook.com/yourprofile',
            instagram: 'https://www.instagram.com/yourprofile',
          },
        }),
      );
    });
  });

  describe('updateProfile function', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockRequest = {
        params: { userID: '65117c94f000c9930ef5c0ee' },
        body: {
          firstName: 'Bobby',
          lastName: 'Orr',
          email: 'test@test.com',
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();
    });

    it('should handle profile update', async () => {
      (Profile.findOneAndUpdate as jest.Mock).mockResolvedValue({
        _id: '65117c94f000c9930ef5c0ee',
        firstName: 'Bobby',
        lastName: 'Orr',
        email: 'test@test.com',
      });

      await updateProfile(mockRequest as Request, mockResponse as Response, mockNext);

      expect(Profile.findOneAndUpdate).toHaveBeenCalledWith(
        { user: '65117c94f000c9930ef5c0ee' },
        mockRequest.body,
        { new: true },
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should handle errors in profile updating', async () => {
      (Profile.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error('Update failed'));

      await updateProfile(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.anything());
    });

    it('should handle the case where no profile is found', async () => {
      (Profile.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      await updateProfile(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          log: 'Express error in updateProfile Middleware - NO PROFILE FOUND',
          status: 404,
          message: { err: 'An error occurred during profile update' },
        }),
      );
    });
  });

  describe('getAllProfiles function', () => {
    xit('should handle successful retrieval of all profiles', async () => {
      const mockProfiles = [
        { _id: '1', user: 'user1', bio: 'Bio 1' },
        { _id: '2', user: 'user2', bio: 'Bio 2' },
      ];
      (Profile.find as jest.Mock).mockResolvedValue(mockProfiles);

      await getAllProfiles(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProfiles);
    });

    it('should handle no profiles found', async () => {
      (Profile.find as jest.Mock).mockResolvedValue([]);

      await getAllProfiles(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          log: 'There are no profiles to retrieve',
          status: 404,
          message: { err: 'There were no profiles to retrieve' },
        }),
      );
    });

    it('should handle errors during profile retrieval', async () => {
      const errorMessage = { message: 'Error finding profiles' };
      (Profile.find as jest.Mock).mockRejectedValue(errorMessage);

      await getAllProfiles(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          log: 'Express error in getAllProfiles Middleware',
          status: 500,
          message: { err: 'An error occurred during profile creation' },
        }),
      );
    });
  });

  describe('getProfileById function', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockRequest = { params: { userID: 'someUserId' } };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();
    });

    it('should handle successful profile retrieval', async () => {
      const mockProfile = {
        _id: 'someUserId',
        bio: 'User Bio',
        //ABBRIEVIATED PROFILE OBJECT
      };
      (Profile.findOne as jest.Mock).mockResolvedValue(mockProfile);

      await getProfileById(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProfile);
    });

    it('should handle profile not found', async () => {
      (Profile.findOne as jest.Mock).mockResolvedValue(null);

      await getProfileById(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          log: 'Profile does not exist',
          status: 404,
          message: { err: 'An error occurred during profile retrieval' },
        }),
      );
    });

    it('should handle errors', async () => {
      const errorMessage = { message: 'Error finding profile' };
      (Profile.findOne as jest.Mock).mockRejectedValue(errorMessage);

      await getProfileById(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          log: 'Express error in getProfileById Middleware',
          status: 500,
          message: { err: 'An error occurred during profile retrieval' },
        }),
      );
    });
  });
});
