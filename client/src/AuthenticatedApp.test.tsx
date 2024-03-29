import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AuthenticatedApp from "./AuthenticatedApp";

const mockStore = configureStore([]);
const initialState = {
  user: {
    userData: null,
    status: "idle",
    error: null,
  },
};

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useNavigate: () => jest.fn(),
  };
});

describe("AuthenticatedApp Component", () => {
  let component: RenderResult;

  beforeEach(() => {
    const store = mockStore(initialState);
    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/main"]}>
          <AuthenticatedApp />
        </MemoryRouter>
      </Provider>
    );
  });

  test("renders with the BANNER placeholder text", () => {
    expect(screen.getByText("Code Hammers")).toBeInTheDocument();
  });
});
