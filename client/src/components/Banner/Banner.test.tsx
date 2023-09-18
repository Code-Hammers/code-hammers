import React from "react";
import TestRenderer from 'react-test-renderer'; 
import Banner from './Banner'; 

describe('Banner Component', () => {
    it('renders correctly', () => {
        const tree = TestRenderer
            .create(<Banner />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
