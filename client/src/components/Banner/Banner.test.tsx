import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "./Banner";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

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

  it("renders the Options button", () => {
    render(<Banner />);
    const optionsButton = screen.getByRole("button", { name: "Options" });
    expect(optionsButton).toBeInTheDocument();
  });

  it("opens the dropdown and shows options when Options button is clicked", () => {
    render(<Banner />);
    const optionsButton = screen.getByRole("button", { name: "Options" });
    fireEvent.click(optionsButton);

    const profileOption = screen.getByText("Go to Profile");
    const logoutOption = screen.getByText("Logout");

    expect(profileOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
  });

  it("handles navigation to Profile on clicking Go to Profile", () => {
    render(<Banner />);
    const optionsButton = screen.getByRole("button", { name: "Options" });
    fireEvent.click(optionsButton);

    const profileOption = screen.getByText("Go to Profile");
    fireEvent.click(profileOption);

    expect(mockNavigate).toHaveBeenCalledWith("profile");
  });

  it("handles logout on clicking Logout", () => {
    render(<Banner />);
    const optionsButton = screen.getByRole("button", { name: "Options" });
    fireEvent.click(optionsButton);

    const logoutOption = screen.getByText("Logout");
    fireEvent.click(logoutOption);

    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
