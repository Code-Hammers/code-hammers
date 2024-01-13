import React from "react";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import DirectoryPage from "./DirectoryPage";

interface State {
  user: {
    userName: string;
  };
}

const mockStore = configureStore<State>([]);
const initialState: State = {
  user: {
    userName: "TEST",
  },
};

describe("MainPage Component", () => {
  it("renders correctly", () => {
    const store = mockStore(initialState);
    const tree = create(
      <Provider store={store}>
        <DirectoryPage />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
