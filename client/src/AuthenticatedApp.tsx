import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import Forums from "./pages/Forums/Forums";
import Profiles from "./pages/Profiles/Profiles";
import Profile from "./pages/Profile/Profile";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useNavigate } from "react-router-dom";

const AuthenticatedApp = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch("/api/auth/validate-session", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok && data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Session validation failed:", error);
        navigate("/");
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
