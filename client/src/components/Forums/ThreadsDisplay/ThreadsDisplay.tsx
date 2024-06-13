import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateThread from '../CreateThread/CreateThread';
import { Thread, IForum } from '../../../../types/forums';
import { useAppSelector } from '../../../app/hooks';

interface ThreadsDisplayProps {
  forumId?: string | null;
  onThreadSelect: (threadId: string) => void;
}

const ThreadsDisplay = ({ forumId, onThreadSelect }: ThreadsDisplayProps) => {
  const userID = useAppSelector((state) => state.user.userData?._id);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [forum, setForum] = useState<IForum | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingThread, setCreatingThread] = useState(false);
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');

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

  const handleEditThread = (
    event: React.MouseEvent<HTMLButtonElement>,
    threadId: string,
    title: string,
    content: string,
  ) => {
    event.stopPropagation();
    setEditingThreadId(threadId);
    setEditTitle(title);
    setEditContent(content);
  };

  const handleUpdateThread = async (
    event: React.MouseEvent<HTMLButtonElement>,
    threadId: string,
    forum: string,
  ) => {
    event.stopPropagation();
    setLoading(true);
    try {
      await axios.put(
        `/api/forums/${forumId || forum}/threads/${threadId}`,
        { title: editTitle, content: editContent },
        { withCredentials: true },
      );
      setThreads(
        threads.map((thread) =>
          thread._id === threadId ? { ...thread, title: editTitle, content: editContent } : thread,
        ),
      );
      setEditingThreadId(null);
      setEditTitle('');
      setEditContent('');
      setLoading(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            {editingThreadId === thread._id ? (
              <div onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={editTitle}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
                />
                <textarea
                  value={editContent}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
                />
                <button
                  onClick={(event) => handleUpdateThread(event, thread._id, thread.forum)}
                  className="bg-blue-500 font-bold hover:bg-blue-700 ml-2 py-1 px-2 rounded text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingThreadId(null)}
                  className="bg-gray-500 font-bold hover:bg-gray-700 ml-2 py-1 px-2 rounded text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h4 className="font-bold">{thread.title}</h4>
                <p>{thread.content}</p>
                <small>
                  Started by {thread.user.firstName} on{' '}
                  {new Date(thread.createdAt).toLocaleDateString()}
                </small>
                {userID === thread.user._id && (
                  <button
                    onClick={(event) =>
                      handleEditThread(event, thread._id, thread.title, thread.content)
                    }
                    className="bg-yellow-500 font-bold hover:bg-yellow-700 ml-2 py-1 px-2 rounded text-white"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsDisplay;
