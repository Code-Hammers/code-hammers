import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import Forums from './pages/Forums/Forums';
import Profiles from './pages/Profiles/Profiles';
import Profile from './pages/Profile/Profile';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import Directory from './pages/DirectoryPage/DirectoryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ApplicationsPage from "./pages/ApplicationsPage/ApplicationsPage";
import CreateApplicationPage from './pages/CreateApplicationPage/CreateApplicationPage";
import UpdateApplicationPage from "./pages/UpdateApplicationPage/UpdateApplicationPage';

const AuthenticatedApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch('/api/auth/validate-session', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (!response.ok || !data.isAuthenticated) {
          navigate('/');
        }
      } catch (error) {
        console.error('Session validation failed:', error);
        navigate('/');
      }
    };

    validateSession();
  }, [navigate]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="main" element={<MainPage />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/create-application" element={<CreateApplicationPage />} />
        <Route
          path="/update-application/:id"
          element={<UpdateApplicationPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
