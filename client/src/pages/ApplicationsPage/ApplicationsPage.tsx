import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { IApplication } from "../../../types/applications";

const ApplicationsPage = (): JSX.Element => {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await axios.get("/api/applications");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    }

    fetchApplications();
  }, []);

  return (
    <div className="pt-40 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-4">Applications!</h1>
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-700">
          {applications.map((application) => (
            <li key={application.id} className="py-4">
              <div className="text-lg font-bold">
                {application.title} at {application.company}
              </div>
              <div className="text-sm text-gray-400">
                Status: {application.status}
              </div>
              <div className="text-sm text-gray-400">
                Notes: {application.notes}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationsPage;
