import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

// MOCK THE BROWSER ROUTER SO THAT WE CAN WRAP APP COMPONENT WITH MEMORYROUTER
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    };
});

describe('App Component', () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
    });

    test('renders LandingPage component at root path', () => {
        expect(screen.getByText('Code Hammers')).toBeInTheDocument();
    });
});




