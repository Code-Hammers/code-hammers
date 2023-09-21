import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import { useAppSelector } from "./app/hooks";
import MainPage from "./pages/MainPage/MainPage";
import Forums from "./pages/Forums/Forums";
import Profiles from "./pages/Profiles/Profiles";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useNavigate } from "react-router-dom";

const AuthenticatedApp = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userName);

  useEffect(() => {
    if (user !== "TEST") {
      navigate("/");
    }
  });
  return (
    <div>
      <Banner />
      <Navbar />
      <Routes>
        <Route path="main" element={<MainPage />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
