import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(<App />);
    });

    test('renders App component', () => {
        const { getByText } = component;
        expect(getByText('App')).toBeInTheDocument();
    });
});

