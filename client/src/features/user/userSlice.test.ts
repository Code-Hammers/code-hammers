import axios from "axios";
import userReducer, {
  initialState,
  loginUser,
  logout,
  UserState,
} from "./userSlice";

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
});
