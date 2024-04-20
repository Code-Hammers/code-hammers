import React, { useEffect, useState } from "react";
import axios from "axios";
import { Thread } from "../../../../types/forums";

interface ThreadsDisplayProps {
  forumId?: string | null;
}

const ThreadsDisplay: React.FC<ThreadsDisplayProps> = ({ forumId }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const endpoint = forumId
          ? `/api/forums/${forumId}/threads`
          : "/api/forums/threads";
        const { data } = await axios.get(endpoint, {
          withCredentials: true,
        });
        setThreads(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setLoading(false);
      }
    };

    fetchThreads();
  }, [forumId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        {forumId
          ? `Showing threads for forum ${forumId}`
          : "Showing all threads"}
      </h3>
      <ul>
        {threads.map((thread) => (
          <li key={thread._id} className="mb-2 p-2 bg-gray-800 rounded-lg">
            <h4 className="font-bold">{thread.title}</h4>
            <p>{thread.content}</p>
            <small>
              Started by {thread.user.firstName} on{" "}
              {new Date(thread.createdAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsDisplay;
