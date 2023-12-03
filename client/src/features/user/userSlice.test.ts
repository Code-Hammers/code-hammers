import axios from "axios";
import userReducer, { initialState, loginUser, UserState } from "./userSlice";

jest.mock("axios");

describe("userSlice", () => {
  describe("reducers", () => {
    it("should return the initial state", () => {
      expect(userReducer(undefined, {} as any)).toEqual(initialState);
    });
  });
});
