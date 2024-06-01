import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../features/user/userSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the loginUser async thunk with formData
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((user) => {
        console.log('User logged in:', user);
        navigate('/app/main'); // navigate to the main app
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Handle login failure (e.g., show error message)
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md">
      <form
        className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500"
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Enter your Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:border-blue-500"
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
