import React, { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    //TODO CLEAR ALL STATE
  };

  const currentPath = location.pathname.replace("/app/", "");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-gray-600 text-white p-4 md:p-6 flex items-center justify-between"
      style={{ margin: "10px 20px 0 20px", zIndex: 1000 }}
    >
      <div className="flex items-center">
        <img src={logo} alt="Code Hammers Logo" className="h-12 md:h-16" />
        <h1 className="ml-3 text-xl md:text-2xl font-bold">Code Hammers</h1>
      </div>

      <div className="flex-grow mx-10">
        <div className="flex justify-evenly space-x-4 md:space-x-6 lg:space-x-10">
          <Link
            to="/app/main"
            className={`text-lg md:text-xl ${
              currentPath === "main" ? "text-gray-300" : "hover:text-gray-300"
            } transition transform hover:scale-105`}
          >
            MainPage
          </Link>
          <Link
            to="/app/profiles"
            className={`text-lg md:text-xl ${
              currentPath === "profiles"
                ? "text-gray-300"
                : "hover:text-gray-300"
            } transition transform hover:scale-105`}
          >
            Profiles
          </Link>
          <Link
            to="/app/forums"
            className={`text-lg md:text-xl ${
              currentPath === "forums" ? "text-gray-300" : "hover:text-gray-300"
            } transition transform hover:scale-105`}
          >
            Forums
          </Link>
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-gray-700 hover:bg-gray-800 font-bold py-2 px-4 rounded"
        >
          Account
        </button>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 py-2 w-48 bg-gray-700 rounded-md shadow-xl z-20"
          >
            <a
              href="#!"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
              onClick={() => {
                navigate("/app/profile");
                setShowDropdown(false);
              }}
            >
              Go to Profile
            </a>
            <a
              href="#!"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
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
