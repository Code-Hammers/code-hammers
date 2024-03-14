import React, { useState } from "react";
import logo from "../../assets/hammer.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Banner = (): JSX.Element => {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    //TODO CLEAR ALL STATE
  };

  const goToProfile = () => {
    navigate("profile");
    setShowDropdown(false);
  };
  return (
    <div className="bg-rose-300 p-4 md:p-6 flex items-center w-full justify-between">
      <img src={logo} alt="Code Hammers Logo" className="h-12 md:h-16" />
      <div className="flex-grow flex justify-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-teal-600">
          Code Hammers
        </h1>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Options
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="#!"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={goToProfile}
            >
              Go to Profile
            </a>
            <a
              href="#!"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
