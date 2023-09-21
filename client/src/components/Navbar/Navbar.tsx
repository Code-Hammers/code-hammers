import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-rose-300 p-4 md:p-6 flex items-center w-full justify-center">
      <div className="flex space-x-4 md:space-x-6 justify-between w-2/3 md:w-1/2">
        {location.pathname !== "/app/main" && (
          <Link
            to="/app/main"
            className="text-teal-600 hover:text-teal-800 transition transform hover:scale-105"
          >
            MainPage
          </Link>
        )}

        {location.pathname !== "/app/profiles" && (
          <Link
            to="/app/profiles"
            className="text-teal-600 hover:text-teal-800 transition transform hover:scale-105"
          >
            Profiles
          </Link>
        )}

        {location.pathname !== "/app/forums" && (
          <Link
            to="/app/forums"
            className="text-teal-600 hover:text-teal-800 transition transform hover:scale-105"
          >
            Forums
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
