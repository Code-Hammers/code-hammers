import React, { useEffect, useState } from "react";
import axios from "axios";

interface Forum {
  _id: string;
  title: string;
  description?: string;
}

const ForumsList = () => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Forums</h2>
      <ul>
        {forums.map((forum) => (
          <li key={forum._id}>{forum.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ForumsList;
