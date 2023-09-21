import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Forums from "./Forums";

describe("Forums Page", () => {
  it("renders the test H1 correctly", () => {
    const { getByText } = render(<Forums />);
    const title = getByText("FORUMS");
    expect(title).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Forums />);
    expect(asFragment()).toMatchSnapshot();
  });
});
