import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AuthenticatedApp from './AuthenticatedApp';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration/" element={<RegistrationPage />} />
        <Route path="/app/*" element={<AuthenticatedApp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
