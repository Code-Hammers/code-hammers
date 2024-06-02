import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import DirectoryPage from './DirectoryPage';
import { Alum } from '../../../types/alum';

interface State {
  alumni: {
    alumni: Alum[];
    status: 'idle' | 'loading' | 'failed';
    page: number;
    totalPages: number;
  };
}

const mockStore = configureStore<State>([]);
const initialState: State = {
  alumni: {
    alumni: [],
    status: 'idle',
    page: 1,
    totalPages: 1,
  },
};

describe('MainPage Component', () => {
  it('renders correctly', () => {
    const store = mockStore(initialState);
    const tree = create(
      <Provider store={store}>
        <DirectoryPage />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
