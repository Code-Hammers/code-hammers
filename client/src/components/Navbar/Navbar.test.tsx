import React from "react";
import TestRenderer from 'react-test-renderer'; 
import Navbar from "./Navbar";

describe('Navbar Component', () => {
    it('renders correctly', () => {
        const tree = TestRenderer
            .create(<Navbar />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});