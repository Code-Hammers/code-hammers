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
      className="bg-gray-600 fixed flex items-center justify-between left-0 md:p-6 p-4 right-0 text-white top-0"
      style={{ margin: "10px 20px 0 20px", zIndex: 1000 }}
    >
      <Link to="/app/main" className="flex items-center">
        <img src={logo} alt="Code Hammers Logo" className="h-12 md:h-16" />
        <h1 className="font-bold md:text-2xl ml-3 text-xl">Code Hammers</h1>
      </Link>

      <div className="flex-grow mx-10">
        <div className="flex justify-evenly lg:space-x-10 md:space-x-6 space-x-4">
          <Link
            to="/app/directory"
            className={`text-lg md:text-xl ${
              currentPath === "main" ? "text-gray-300" : "hover:text-gray-300"
            } transition transform hover:scale-105`}
          >
            Alumni
          </Link>
          <Link
            to="/app/profiles"
            className={`md:text-xl text-lg  ${
              currentPath === "profiles"
                ? "text-gray-300"
                : "hover:text-gray-300"
            } transition transform hover:scale-105`}
          >
            Profiles
          </Link>
          <Link
            to="/app/forums"
            className={`md:text-xl text-lg  ${
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
          className="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white" 
        >
          Account
        </button>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute bg-gray-700 mt-2 py-2 right-0 rounded-md shadow-xl w-48 z-20"
          >
            <a
              href="#!"
              className="block hover:bg-gray-800 px-4 py-2 text-sm text-white"
              onClick={() => {
                navigate("/app/editProfile");
                setShowDropdown(false);
              }}
            >
              Edit Profile
            </a>
            <a
              href="#!"
              className="block hover:bg-gray-800 px-4 py-2 text-sm text-white"
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
