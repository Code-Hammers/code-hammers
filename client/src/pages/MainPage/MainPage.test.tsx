import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import MainPage from './MainPage';

interface State {
  user: {
    userName: string;
  };
}

const mockStore = configureStore<State>([]);
const initialState: State = {
  user: {
    userName: 'TEST',
  },
};

describe('MainPage Component', () => {
  it('renders correctly', () => {
    const store = mockStore(initialState);
    const tree = create(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
