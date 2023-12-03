import axios from "axios";
import userReducer, {
  initialState,
  loginUser,
  logout,
  UserState,
} from "./userSlice";
import { AppDispatch } from "../../app/store";

import { IUser } from "../../../types/user";

jest.mock("axios");

describe("userSlice", () => {
  describe("reducers", () => {
    it("should return the initial state", () => {
      expect(userReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("should handle logout", () => {
      const mockUserData: IUser = {
        firstName: "John",
        lastName: "Doh",
        _id: "123456",
        email: "john.doh@email.com",
        token: "token",
      };

      const startingState: UserState = {
        ...initialState,
        userData: mockUserData,
        status: "idle",
        error: null,
      };
      const expectedState: UserState = {
        ...initialState,
        userData: null,
        status: "idle",
        error: null,
      };

      expect(userReducer(startingState, logout())).toEqual(expectedState);
    });
  });

  describe("loginUser async thunk", () => {
    const mockUser = { name: "John Doh" };
    const mockCredentials = { email: "john.doh@email.com", password: "123456" };

    it("handles successful login", async () => {
      (axios.post as jest.Mock).mockResolvedValue({ data: mockUser });

      const thunk = loginUser(mockCredentials);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await thunk(dispatch, getState, null);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: "user/login/pending" })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "user/login/fulfilled",
          payload: mockUser,
        })
      );
    });
  });
});
