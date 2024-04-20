import React, { useState } from "react";
import ForumsList from "../../components/Forums/ForumsList/ForumsList";
import ThreadsDisplay from "../../components/Forums/ThreadsDisplay/ThreadsDisplay";
import ThreadDetails from "../../components/Forums/ThreadDetails/ThreadDetails";

const Forums = (): JSX.Element => {
  const [selectedForumId, setSelectedForumId] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  const handleForumSelect = (forumId: string | null) => {
    setSelectedForumId(forumId);
    setSelectedThreadId(null);
  };

  const handleThreadSelect = (threadId: string) => {
    setSelectedThreadId(threadId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex pt-40 px-4">
      <div className="w-64 md:w-1/4 lg:w-1/5 p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 overflow-y-auto">
        <ForumsList
          onForumSelect={handleForumSelect}
          selectedForumId={selectedForumId}
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {selectedThreadId ? (
          <ThreadDetails
            forumId={selectedForumId}
            threadId={selectedThreadId}
          />
        ) : (
          <ThreadsDisplay
            forumId={selectedForumId}
            onThreadSelect={handleThreadSelect}
          />
        )}
      </div>
    </div>
  );
};

export default Forums;
