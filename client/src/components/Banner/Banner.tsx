import React from "react";
import logo from "../../assets/hammer.png";

const Banner = (): JSX.Element => {
  return (
    <div className="bg-rose-300 p-4 md:p-6 flex items-center w-full justify-between">
      {" "}
      <img src={logo} alt="Code Hammers Logo" className="h-12 md:h-16" />
      <div className="flex-grow flex justify-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-teal-600">
          Code Hammers
        </h1>{" "}
      </div>
    </div>
  );
};

export default Banner;
