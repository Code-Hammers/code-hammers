import React from "react";
import logo from "../../assets/hammer.png";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Banner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="bg-rose-300 p-4 md:p-6 flex items-center w-full justify-between">
      {" "}
      <img src={logo} alt="Code Hammers Logo" className="h-12 md:h-16" />
      <div className="flex-grow flex justify-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-teal-600">
          Code Hammers
        </h1>{" "}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Banner;
