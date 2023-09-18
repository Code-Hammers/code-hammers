import React from "react";
import { create }from 'react-test-renderer'; 
import Banner from './Banner'; 

describe('Banner Component', () => {
    it('renders correctly', () => {
        const tree = create(<Banner />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
