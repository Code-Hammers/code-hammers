import axios from 'axios';
import { ObjectId } from 'mongoose';
import profileReducer, { initialState, fetchUserProfile, ProfileState } from './userProfileSlice';
import { AppDispatch } from '../../app/store';

jest.mock('axios');

describe('userProfileSlice', () => {
  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(profileReducer(undefined, {} as any)).toEqual(initialState);
    });
  });

  describe('fetchUserProfile async thunk', () => {
    const mockProfile = {
      user: 'some ID string',
      firstName: 'John',
      lastName: 'Doh',
      bio: 'An awesome and creative bio',
      job: {
        title: 'Senior Developer',
        company: 'ACME Software Co',
        description: 'Developing cool stuff',
        date: new Date(),
      },
      socials: {
        linkedIn: 'linkedin.com/in/johndoh',
        github: 'github.com/johndoh',
        twitter: 'twitter.com/johndoh',
        facebook: 'facebook.com/johndoh',
        instagram: 'instagram.com/johndoh',
      },
    };
    const userID = 'some-user-id';

    it('handles successful profile fetch', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: mockProfile });

      const thunk = fetchUserProfile(userID);
      const dispatch = jest.fn() as AppDispatch;
      const getState = jest.fn();

      await thunk(dispatch, getState, null);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'profile/fetchUserProfile/pending' }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'profile/fetchUserProfile/fulfilled',
          payload: mockProfile,
        }),
      );
    });

    it('handles profile fetch failure when profile does not exist', async () => {
      const errorMessage = 'An error occurred during profile retrieval';
      const mockAxiosError = {
        response: {
          status: 404,
          data: { message: { err: errorMessage } },
        },
        isAxiosError: true,
      };
      (axios.get as jest.Mock).mockRejectedValue(mockAxiosError);

      const thunk = fetchUserProfile(userID);
      const dispatch = jest.fn() as AppDispatch;
      const getState = jest.fn();

      await thunk(dispatch, getState, null);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'profile/fetchUserProfile/pending' }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'profile/fetchUserProfile/rejected',
          payload: errorMessage,
        }),
      );
    });
  });
});
