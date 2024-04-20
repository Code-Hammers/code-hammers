import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Forums from "./Forums";

describe("Forums Page", () => {
  it("renders without crashing", () => {
    render(<Forums />);
  });
});
