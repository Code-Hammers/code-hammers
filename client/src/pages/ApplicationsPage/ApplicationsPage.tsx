import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { IApplication } from '../../../types/applications';
import ApplicationDashboard from '../../components/ApplicationDashBoard/ApplicationDashBoard';

const ApplicationsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [showRejected, setShowRejected] = useState(true);
  const [dateFilter, setDateFilter] = useState(false);
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const params: any = { userId: user?._id };
        if (!showRejected) params.status = 'Rejected';

        //TODO adjust time delay for production - Let user select dif times from dropdown?
        if (dateFilter) {
          const thirtySecondsAgo = new Date(Date.now() - 30 * 3000);
          params.date = thirtySecondsAgo.toISOString();
        }
        console.log('Fetching applications with params: ', params);

        const response = await axios.get(`/api/applications`, { params });

        setApplications(response.data);
        console.log('Fetched applications: ', applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }

    fetchApplications();
    // TODO Not sure I want to keep this. here for testing
    const intervalId = setInterval(fetchApplications, 5000);
    return () => clearInterval(intervalId);
  }, [showRejected, dateFilter]);

  const calculateIsInactive = (application: IApplication) => {
    const { last_updated, notification_period, notifications_paused } = application;
    if (notifications_paused) return false;

    const lastUpdatedDate = new Date(last_updated);
    const notificationPeriodMs = notification_period * 5000;
    return new Date().getTime() - lastUpdatedDate.getTime() > notificationPeriodMs;
  };

  const handleTogglePause = async (id: number, pause: boolean) => {
    try {
      await axios.put(`/api/applications/${id}/pause-notifications`, { pause });
      setApplications((prevApps) =>
        prevApps.map((app) => (app.id === id ? { ...app, notifications_paused: pause } : app)),
      );
    } catch (error) {
      console.error('Error updating notification pause:', error);
    }
  };

  const handlePeriodChange = async (id: number, period: number) => {
    try {
      await axios.put(`/api/applications/${id}/notification-period`, { period });
      setApplications((prevApps) =>
        prevApps.map((app) => (app.id === id ? { ...app, notification_period: period } : app)),
      );
    } catch (error) {
      console.error('Error updating notification period:', error);
    }
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
        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={!showRejected}
              onChange={() => setShowRejected(!showRejected)}
            />
            Remove Rejected Applications
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={dateFilter}
              onChange={() => setDateFilter(!dateFilter)}
            />
            Remove Applications Older than 30 Days
          </label>
        </div>
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
              <div className="flex items-center mt-2">
                <label className="mr-2 text-gray-400">Notification Period:</label>
                <select
                  className="bg-gray-700 text-white p-1 rounded"
                  value={application.notification_period}
                  onChange={(e) => handlePeriodChange(application.id, parseInt(e.target.value))}
                >
                  <option value={30}>30 seconds</option>
                  <option value={86400}>1 day</option>
                  <option value={259200}>3 days</option>
                  <option value={604800}>1 week</option>
                  <option value={2592000}>1 month</option>
                </select>
              </div>
              <div className="flex items-center mt-2">
                <label className="mr-2 text-gray-400">Notifications:</label>
                <input
                  type="checkbox"
                  checked={!application.notifications_paused}
                  onChange={(e) => handleTogglePause(application.id, !e.target.checked)}
                  className="bg-gray-700 text-white p-1 rounded"
                />
                <span className="ml-2 text-gray-400">
                  {application.notifications_paused ? 'Paused' : 'Active'}
                </span>
              </div>
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
