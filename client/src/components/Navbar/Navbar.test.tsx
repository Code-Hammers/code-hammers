import TestRenderer from 'react-test-renderer';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar Component', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
