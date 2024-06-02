import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  user: {
    userData: null,
    status: 'idle',
    error: null,
  },
};

// MOCK THE BROWSER ROUTER SO THAT WE CAN WRAP APP COMPONENT WITH MEMORYROUTER
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  };
});

describe('App Component', () => {
  beforeEach(() => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
  });

  test('renders LandingPage component at root path', () => {
    expect(screen.getByText('Code Hammers')).toBeInTheDocument();
  });
});
