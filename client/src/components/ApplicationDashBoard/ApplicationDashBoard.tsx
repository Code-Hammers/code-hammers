import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";

interface IStatusCount {
  status: string;
  count: number;
}

const ApplicationDashboard = (): JSX.Element => {
  const [totalApplications, setTotalApplications] = useState(0);
  const [applicationsByStatus, setApplicationsByStatus] = useState<
    IStatusCount[]
  >([]);
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchAggregatedData() {
      try {
        const response = await axios.get(
          `/api/applications/aggregated-user-stats?user_id=${user?._id}`
        );
        setTotalApplications(response.data.totalApplications);
        setApplicationsByStatus(response.data.applicationsByStatus);
      } catch (error) {
        console.error("Error fetching aggregated data:", error);
      }
    }

    fetchAggregatedData();
  }, [user?._id]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 w-full max-w-4xl">
      <h2 className="font-extrabold text-2xl mb-2">Dashboard</h2>
      <div className="mb-2">
        <span className="font-bold">Total Applications:</span>{" "}
        {totalApplications}
      </div>
      <div>
        <h3 className="font-bold">Applications by Status:</h3>
        <ul className="list-disc ml-4">
          {applicationsByStatus.map((status) => (
            <li key={status.status}>
              {status.status}: {status.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationDashboard;
