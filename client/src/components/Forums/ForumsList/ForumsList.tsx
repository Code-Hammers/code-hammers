import React, { useEffect, useState } from "react";
import axios from "axios";

interface Forum {
  _id: string;
  title: string;
  description?: string;
}

interface ForumsListProps {
  onForumSelect: (forumId: string | null) => void;
  selectedForumId: string | null;
}

const ForumsList: React.FC<ForumsListProps> = ({
  onForumSelect,
  selectedForumId,
}) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForums = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/forums", {
          withCredentials: true,
        });
        setForums(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  const testConnection = async () => {
    try {
      const response = await axios.get("/api/test-db", {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error testing database connection:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Forums</h2>
      <button
        onClick={testConnection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Database Connection
      </button>
      <ul>
        <li
          onClick={() => onForumSelect(null)}
          className={`cursor-pointer p-2 hover:bg-gray-800 rounded-md ${
            selectedForumId === null ? "bg-gray-700" : ""
          }`}
        >
          All Forums
        </li>
        {forums.map((forum) => (
          <li
            key={forum._id}
            onClick={() => onForumSelect(forum._id)}
            className={`cursor-pointer p-2 hover:bg-gray-800 rounded-md ${
              selectedForumId === forum._id ? "bg-gray-700" : ""
            }`}
          >
            {forum.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumsList;
