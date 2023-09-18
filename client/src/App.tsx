import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthenticatedApp from "./AuthenticatedApp"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<AuthenticatedApp />} />
      </Routes>
    </Router>
  );
};

export default App;
