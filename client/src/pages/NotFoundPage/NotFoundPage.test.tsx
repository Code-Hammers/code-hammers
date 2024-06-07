import { create } from 'react-test-renderer';

import NotFoundPage from './NotFoundPage';

describe('MainPage Component', () => {
  it('renders correctly', () => {
    const tree = create(<NotFoundPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
