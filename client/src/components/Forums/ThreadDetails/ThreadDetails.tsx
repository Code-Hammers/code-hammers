import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "../CreatePost/CreatePost";
import { Thread, IPost } from "../../../../types/forums";

interface ThreadDetailProps {
  forumId: string | null;
  threadId: string;
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({ forumId, threadId }) => {
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingPost, setCreatingPost] = useState(false);

  useEffect(() => {
    const fetchThreadDetails = async () => {
      setLoading(true);
      try {
        const endpoint = forumId
          ? `/api/forums/${forumId}/threads/${threadId}`
          : `/api/forums/threads/${threadId}`;
        const response = await axios.get(endpoint, { withCredentials: true });
        setThread(response.data.thread);
        setPosts(response.data.posts || []);

        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setLoading(false);
      }
    };

    fetchThreadDetails();
  }, [forumId, threadId, creatingPost]);

  const toggleCreatePost = () => {
    setCreatingPost(!creatingPost);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!thread) return <div>Thread not found.</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold">{thread.title}</h2>
      <p className="my-4">{thread.content}</p>
      <button
        onClick={toggleCreatePost}
        className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {creatingPost ? "Cancel" : "Add Reply"}
      </button>
      {creatingPost && (
        <CreatePost
          forumId={forumId}
          threadId={threadId}
          onClose={toggleCreatePost}
        />
      )}
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
