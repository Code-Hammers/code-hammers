import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "./Banner";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

// Mock the hooks and external dependencies
jest.mock("../../app/hooks", () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock("../../features/user/userSlice", () => ({
  logout: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Banner Component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logo image correctly", () => {
    render(<Banner />);
    const logo = screen.getByAltText("Code Hammers Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the title text correctly", () => {
    render(<Banner />);
    const title = screen.getByText("Code Hammers");
    expect(title).toBeInTheDocument();
  });

  it("renders the logout button and handles logout on click", () => {
    render(<Banner />);
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();

    // Simulate a click on the logout button
    fireEvent.click(logoutButton);

    // Expect the logout action to be dispatched
    expect(mockDispatch).toHaveBeenCalledWith(logout());

    // Expect navigation to have been called with the root path
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
