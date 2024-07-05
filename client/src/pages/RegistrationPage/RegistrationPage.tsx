import { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../features/user/userSlice';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const [registrationError, setRegistrationError] = useState(null);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setRegistrationError(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistrationError(false);
    if (!token) {
      console.error('Token is missing.');
      setRegistrationError('token');
      // return; //TODO Display error feedback for user
      
    }
    ;
    //TODO User feedback needed
    if (formData.password !== formData.password2) {
      setRegistrationError('passwords do not match')
    };
    try {
      const response = await fetch(`/api/users/register?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setRegistrationError('general')
        throw new Error(data.message || 'An error occurred during registration.');
      }

      dispatch(loginUser({ email: formData.email, password: formData.password }))
        .unwrap()
        .then(() => {
          navigate('/app/main');
        })
        .catch((error) => {
          console.error('Error adding user to state:', error);
        });
    } catch (error) {
      //TODO Needs better error handling and user feedback
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Registration Page</h1>
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password2">
              Password
            </label>
            <input
              className="appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500"
              id="password2"
              name="password2"
              type="password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          {registrationError === 'token' && (
            <div className="mt-4 text-red-500 text-center">
              Sorry! That token is invalid or expired. Please e-mail brok3turtl3@gmail.com for
              assistance.
            </div>
          )}
          {registrationError === 'general' && (
            <div className="mt-4 text-red-500 text-center">
              Sorry! It's not you - it's us. We are unable to register you at this time. Please
              e-mail brok3turtl3@gmail.com for assistance.
            </div>
          )}
          {registrationError === 'passwords do not match' && (
            <div className="mt-4 text-red-500 text-center">
              Passwords do not match. Please try again. 
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
