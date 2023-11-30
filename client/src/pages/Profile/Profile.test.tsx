import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./Profile";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUserProfile } from "../../features/userProfile/userProfileSlice";

jest.mock("../../app/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../features/userProfile/userProfileSlice", () => ({
  fetchUserProfile: jest.fn(),
}));

describe("Profile Component", () => {
  const mockDispatch = jest.fn();
  const mockUser = {
    _id: "12345",
    name: "John Doe",
  };
  //TODO MOCK BETTER USERPROFILE DATA
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        user: { userData: mockUser },
        userProfile: { profile: null },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Profile component", () => {
    render(<Profile />);
    const profileTitle = screen.getByText("Profile");
    expect(profileTitle).toBeInTheDocument();
  });

  it("dispatches fetchUserProfile on component mount", () => {
    render(<Profile />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchUserProfile(mockUser._id));
  });

  it("displays the user's ID", () => {
    render(<Profile />);
    const userIdDisplay = screen.getByText(mockUser._id);
    expect(userIdDisplay).toBeInTheDocument();
  });
});
