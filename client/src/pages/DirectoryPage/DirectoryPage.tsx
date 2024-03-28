import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";

const DirectoryPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    const getAlumniData = async () => {
      try {
        const response = await axios.get("/api/alumni");
        console.log(response);
      } catch (error) {
        console.log("Something just caught fire in Directory useEffect");
      }
    };

    getAlumniData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Directory Page</h1>
      <h1>Welcome {user?.firstName} !</h1>
      <h2>Directory</h2>
    </div>
  );
};

export default DirectoryPage;
