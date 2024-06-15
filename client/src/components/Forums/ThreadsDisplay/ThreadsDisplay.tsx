import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateThread from '../CreateThread/CreateThread';
import { Thread, IForum } from '../../../../types/forums';

interface ThreadsDisplayProps {
  forumId?: string | null;
  onThreadSelect: (threadId: string) => void;
}

const ThreadsDisplay = ({ forumId, onThreadSelect }: ThreadsDisplayProps) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [forum, setForum] = useState<IForum | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingThread, setCreatingThread] = useState(false);

  useEffect(() => {
    const fetchForumAndThreads = async () => {
      setLoading(true);
      try {
        const endpoint = forumId ? `/api/forums/${forumId}` : '/api/forums/threads';
        const { data } = await axios.get(endpoint, {
          withCredentials: true,
        });
        if (forumId) {
          setForum(data.forum);
          setThreads(data.threads);
        } else {
          setForum(null);
          setThreads(data);
        }
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setLoading(false);
      }
    };

    fetchForumAndThreads();
  }, [forumId, creatingThread]);

  const toggleCreateThread = () => {
    setCreatingThread(!creatingThread);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // console.log('Current forum', forum);
  console.log('Fetched threads:', threads);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        {forum ? `Showing threads for ${forum.title}` : 'Showing all threads'}
      </h3>
      {forumId && (
        <button
          onClick={toggleCreateThread}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {creatingThread ? 'Cancel' : 'Create New Thread'}
        </button>
      )}
      {creatingThread && forumId ? (
        <CreateThread forumId={forumId} onClose={toggleCreateThread} />
      ) : null}

      <ul>
        {threads.map((thread) => (
          <li
            key={thread._id}
            className="mb-2 p-2 bg-gray-800 rounded-lg cursor-pointer"
            onClick={() => onThreadSelect(thread._id)}
          >
            <h4 className="font-bold">{thread.title}</h4>
            <small>
              {thread.postCount === 0
                ? 'No replies'
                : thread.postCount === 1
                  ? '1 reply'
                  : `${thread.postCount} replies`}
            </small>
            <p>{thread.content}</p>
            <small>
              Started by {thread.user.firstName} on{' '}
              {new Date(thread.createdAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsDisplay;
