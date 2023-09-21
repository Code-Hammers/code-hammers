import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profiles from "./Profiles";

describe("Profiles Page", () => {
  it("renders the test H1 correctly", () => {
    const { getByText } = render(<Profiles />);
    const title = getByText("PROFILES");
    expect(title).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Profiles />);
    expect(asFragment()).toMatchSnapshot();
  });
});
