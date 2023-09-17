import React from "react";
import { useAppSelector } from "../../app/hooks";

const MainPage: React.FC = () => {
  const user = useAppSelector((state) => state.user.userName);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">{user}</h1>
      <h1>TEST</h1>
    </div>
  );
};

export default MainPage;
