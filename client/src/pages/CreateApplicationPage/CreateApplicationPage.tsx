import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { IApplication } from "../../../types/applications";

const CreateApplicationPage = (): JSX.Element => {
  const [application, setApplication] = useState<IApplication[]>([]);
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchApplicationById() {
      try {
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    }

    fetchApplicationById();
  }, []);

  return (
    <div className="pt-40 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-4">Create Applications</h1>
    </div>
  );
};

export default CreateApplicationPage;
