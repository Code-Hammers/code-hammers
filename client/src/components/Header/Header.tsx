import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/hammer.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";

const Header = (): JSX.Element => {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    //TODO CLEAR ALL STATE
  };

  const currentPath = location.pathname.replace("/app/", "");

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-gray-600 text-white p-4 md:p-6 flex items-center justify-between"
      style={{ margin: "10px 20px 0 20px", zIndex: 1000 }}
    >
      <img src={logo} alt="Code Hammers Logo" className="h-12 md:h-16" />
      <div className="flex space-x-4 md:space-x-6">
        <Link
          to="/app/main"
          className={`${
            currentPath === "main" ? "text-gray-300" : "hover:text-gray-300"
          } transition transform hover:scale-105`}
        >
          MainPage
        </Link>
        <Link
          to="/app/profiles"
          className={`${
            currentPath === "profiles" ? "text-gray-300" : "hover:text-gray-300"
          } transition transform hover:scale-105`}
        >
          Profiles
        </Link>
        <Link
          to="/app/forums"
          className={`${
            currentPath === "forums" ? "text-gray-300" : "hover:text-gray-300"
          } transition transform hover:scale-105`}
        >
          Forums
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-gray-700 hover:bg-gray-800 font-bold py-2 px-4 rounded"
        >
          Account
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="#!"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                navigate("/app/profile");
                setShowDropdown(false);
              }}
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

export default Header;
