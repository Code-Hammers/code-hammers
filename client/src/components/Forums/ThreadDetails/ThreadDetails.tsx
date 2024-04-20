import React, { useEffect, useState } from "react";
import axios from "axios";
import { Thread, IPost } from "../../../../types/forums";

interface ThreadDetailProps {
  forumId: string;
  threadId: string;
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({ forumId, threadId }) => {
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreadDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/forums/${forumId}/threads/${threadId}`,
          {
            withCredentials: true,
          }
        );
        setThread(response.data.thread);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setLoading(false);
      }
    };

    fetchThreadDetails();
  }, [forumId, threadId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!thread) return <div>Thread not found.</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold">{thread.title}</h2>
      <p className="my-4">{thread.content}</p>
      <div>
        <h3 className="text-2xl font-bold">Replies</h3>
        {posts.map((post) => (
          <div key={post._id} className="mb-4">
            <p>{post.content}</p>
            <small>
              By {post.user.firstName} {post.user.lastName} on{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadDetail;
