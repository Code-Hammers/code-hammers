import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Forums from './Forums';

// TODO
/*eslint jest/no-disabled-tests: "off"*/

describe('Forums Page', () => {
  it('renders without crashing', () => {
    render(<Forums />);

    // TODO - Implement valid test
    expect('replace me').toEqual('replace me');
  });
});
