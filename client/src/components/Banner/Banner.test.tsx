import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "./Banner";

xdescribe("Banner Component", () => {
  it("renders the logo image correctly", () => {
    const { getByAltText } = render(<Banner />);
    const logo = getByAltText("Code Hammers Logo") as HTMLImageElement;

    expect(logo).toBeInTheDocument();
  });

  it("renders the title text correctly", () => {
    const { getByText } = render(<Banner />);
    const title = getByText("Code Hammers");

    expect(title).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Banner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
