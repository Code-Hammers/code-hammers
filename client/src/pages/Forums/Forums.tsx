import React from "react";
import ForumsList from "../../components/Forums/ForumsList/ForumsList";

const Forums = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">FORUMS</h1>
      <ForumsList />
    </div>
  );
};

export default Forums;
