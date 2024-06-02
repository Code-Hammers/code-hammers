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
        const { totalApplications = 0, applicationsByStatus = [] } =
          response.data || {};
        setTotalApplications(totalApplications);
        setApplicationsByStatus(applicationsByStatus);
      } catch (error) {
        console.error("Error fetching aggregated data:", error);
      }
    }

    fetchAggregatedData();
  }, [user?._id]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 w-full max-w-4xl">
      <h2 className="font-extrabold text-2xl mb-2">Dashboard</h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Applications
            </th>
            {applicationsByStatus.map((status) => (
              <th
                key={status.status}
                className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                {status.status}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-white">
              {totalApplications}
            </td>
            {applicationsByStatus.map((status) => (
              <td
                key={status.status}
                className="px-6 py-4 whitespace-nowrap text-sm text-center text-white"
              >
                {status.count}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationDashboard;
