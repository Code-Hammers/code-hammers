import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../../app/hooks';
import CreatePost from '../CreatePost/CreatePost';
import { Thread, IPost } from '../../../../types/forums';

interface ThreadDetailProps {
  forumId: string | null;
  threadId: string;
}

const ThreadDetail = ({ forumId, threadId }: ThreadDetailProps) => {
  const userID = useAppSelector((state) => state.user.userData?._id);
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
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

  const handleDeletePost = async (postId: string) => {
    setPending(true);
    try {
      await axios.delete(`/api/forums/${forumId}/threads/${threadId}/posts/${postId}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post: IPost) => post._id !== postId));
      setPending(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setPending(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!thread) return <div>Thread not found.</div>;

  const totalPosts = posts.length + 1;
  console.log(posts)

  return (
    <div>
      <h2 className="font-bold text-3xl">{thread.title}</h2>
      <p className="my-4">{thread.content}</p>
      <button
        onClick={toggleCreatePost}
        className="bg-blue-500 font-bold hover:bg-blue-700 mb-2 py-2 px-4 rounded text-white"
      >
        {creatingPost ? 'Cancel' : 'Add Reply'}
      </button>
      {creatingPost && (
        <CreatePost forumId={forumId} threadId={threadId} onClose={toggleCreatePost} />
      )}
      <div>
        <h3 className="font-bold text-2xl">Replies</h3>
        {posts.map((post) => (
          <div key={post._id} className="mb-4">
            <p>{post.content}</p>
            <small>
              By {post.user.firstName} {post.user.lastName} on{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
            {userID === post.user._id && (
              <button
                onClick={() => handleDeletePost(post._id)}
                className="bg-red-500 font-bold hover:bg-red-700 ml-2 py-1 px-2 rounded text-white"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <strong>Total Posts:</strong> {totalPosts}
      </div>
    </div>
  );
};

export default ThreadDetail;
