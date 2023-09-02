import React from 'react';
import Login from '../components/Login';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold mb-4">Code Hammers</h1>
            <p className="text-lg mb-4 text-center px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                scelerisque iaculis libero.
            </p>
            <Login />
        </div>
    );
};

export default LandingPage;
