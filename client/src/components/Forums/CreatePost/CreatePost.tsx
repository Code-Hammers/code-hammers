import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface CreatePostProps {
  threadId: string;
  forumId: string | null;
  onClose: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({
  forumId,
  threadId,
  onClose,
}) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `/api/forums/${forumId}/threads/${threadId}/posts`,
        {
          content,
        },
        {
          withCredentials: true,
        }
      );
      setContent("");
      onClose();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to create post:", error);
      setError("Failed to create post");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full rounded border p-2"
        placeholder="Write your response..."
        value={content}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "Posting..." : "Post Reply"}
      </button>
    </form>
  );
};

export default CreatePost;
