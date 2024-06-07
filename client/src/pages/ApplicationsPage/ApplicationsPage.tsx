import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { IApplication } from '../../../types/applications';
import ApplicationDashboard from '../../components/ApplicationDashBoard/ApplicationDashBoard';

const ApplicationsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<IApplication[]>([]);
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await axios.get(`/api/applications?user_id=${user?._id}`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }

    fetchApplications();
  }, []);

  const calculateIsInactive = (application: IApplication) => {
    const { last_updated, notification_period, notifications_paused } = application;
    if (notifications_paused) return false;

    const lastUpdatedDate = new Date(last_updated);
    const notificationPeriodMs = notification_period * 24 * 60 * 60 * 1000;
    return new Date().getTime() - lastUpdatedDate.getTime() > notificationPeriodMs;
  };

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen p-4 pt-40 text-white">
      <ApplicationDashboard />
      <h1 className="font-extrabold mb-4 text-4xl">Applications!</h1>
      <button
        onClick={() => navigate('/app/create-application')}
        className="bg-blue-500 focus:shadow-outline font-bold hover:bg-blue-700 mb-4 py-2 px-4 rounded selection:focus:outline-none text-white"
      >
        Create New Application
      </button>
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul className="divide-gray-700 divide-y ">
          {applications.map((application) => (
            <li key={application.id} className="py-4">
              <div className="font-bold text-lg ">
                {application.title} at {application.company}
              </div>
              <div className="text-gray-400 text-sm ">Status: {application.status}</div>
              <div className="text-gray-400 text-sm ">Notes: {application.general_notes}</div>
              {calculateIsInactive(application) && (
                <div className="text-red-500 text-sm font-bold">
                  This application needs attention!
                </div>
              )}
              <button
                className="bg-blue-500 focus:outline-none focus:shadow-outline font-bold hover:bg-blue-700 mt-2 px-4 py-2 rounded text-white"
                onClick={() => navigate(`/app/update-application/${application.id}`)}
              >
                Update Application
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationsPage;
