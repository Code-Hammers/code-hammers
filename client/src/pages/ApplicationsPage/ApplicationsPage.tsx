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
  const [dateFilter, setDateFilter] = useState('');
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const params: any = { userId: user?._id };
        if (!showRejected) params.status = 'Rejected';

        //TODO adjust time delay for production - Let user select dif times from dropdown?
        if (dateFilter) params.date = new Date(Date.now() - 30 * 1000).toISOString();
        console.log(params);

        const response = await axios.get(`/api/applications`, { params });
        setApplications(response.data);
        console.log(applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }

    fetchApplications();
  }, [showRejected, dateFilter]);

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
              checked={!!dateFilter}
              onChange={() => setDateFilter(dateFilter ? '' : '30-days')}
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
