import React from "react";
import { useAppSelector } from "../../app/hooks";

const MainPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.user.userData);
  console.log("user data", user?.name);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Main Page</h1>
      <h1>Welcome {user?.name} !</h1>
    </div>
  );
};

export default MainPage;
