import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
