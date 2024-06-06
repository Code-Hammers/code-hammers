import { Link } from 'react-router-dom';
import Login from '../components/Login/Login';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold mb-6">Code Hammers</h1>
      <p className="text-xl mb-6 text-center px-6">
        Welcome to Code Hammers! Please log in to continue to the main application.
      </p>
      <Login />
      <Link to="./password-reset" className="mt-4 text-blue-500 hover:underline">
        Forgot Password?
      </Link>
    </div>
  );
};

export default LandingPage;
