import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface CreateThreadProps {
  forumId: string;
  onClose: () => void;
}

const CreateThread = ({ forumId, onClose }: CreateThreadProps) => {
  const [formData, setFormData] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });

  const { title, content } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`/api/forums/${forumId}/threads`, formData, {
        withCredentials: true,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create thread:', error);
      //TODO userfeedback with errors
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Thread Title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            name="content"
            rows={4}
            placeholder="Write something..."
            value={content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Thread
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateThread;
