import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateApplication } from '../../features/applications/applicationSlice';
import { IApplicationFormData, IStatus } from '../../../types/applications';

const UpdateApplicationPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  console.log('id:', id);
  const user = useAppSelector((state) => state.user.userData);
  const { status } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [statuses, setStatuses] = useState<IStatus[]>([]);
  const [formData, setFormData] = useState<IApplicationFormData>({
    title: '',
    company: '',
    location: '',
    description: '',
    url: '',
    status_id: 1,
    user_id: user?._id || '',
    quick_apply: false,
    date_applied: new Date().toISOString().split('T')[0],
    general_notes: '',
    job_id: 0,
  });

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await axios.get('/api/applications/statuses');
        setStatuses(response.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    }

    async function fetchApplication() {
      try {
        const response = await axios.get(`/api/applications/${id}`);
        const applicationData = response.data;
        applicationData.date_applied = new Date(applicationData.date_applied)
          .toISOString()
          .split('T')[0];

        setFormData(applicationData);
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    }

    fetchStatuses();
    if (id) fetchApplication();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateApplication({ id: Number(id), ...formData }));
    navigate('/app/applications');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="pt-40 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-4">Update Application</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <label className="block text-sm font-bold mb-2" htmlFor="title">
          Job Title
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            readOnly
          />
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="company">
          Company
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            required
            readOnly
          />
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="location">
          Location
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="description">
          Description
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="url">
          URL
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="url"
            name="url"
            type="text"
            value={formData.url}
            onChange={handleChange}
          />
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="status_id">
          Status
          <select
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="status_id"
            name="status_id"
            value={formData.status_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Status
            </option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="quick_apply">
          Quick Apply
          <input
            className="ml-2"
            id="quick_apply"
            name="quick_apply"
            type="checkbox"
            checked={formData.quick_apply}
            onChange={handleChange}
          />
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="date_applied">
          Date Applied
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="date_applied"
            name="date_applied"
            type="date"
            value={formData.date_applied}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block text-sm font-bold mb-2" htmlFor="general_notes">
          General Notes
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="general_notes"
            name="general_notes"
            value={formData.general_notes}
            onChange={handleChange}
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {status === 'updating' ? 'Updating...' : 'Update Application'}
        </button>
      </form>
    </div>
  );
};

export default UpdateApplicationPage;