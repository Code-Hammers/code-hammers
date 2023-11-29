import React from "react";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Profiles from "./Profiles";

interface State {
  profiles: {
    profiles: { user: string }[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
  };
}

const mockStore = configureStore<State>([]);
const initialState: State = {
  profiles: {
    profiles: [
      { user: "User1" },
      { user: "User2" }
    ],
    status: 'idle',
    error: null
  }
  },
};

describe("MainPage Component", () => {
  it("renders correctly", () => {
    const store = mockStore(initialState);
    const tree = create(
      <Provider store={store}>
        <Profiles />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

