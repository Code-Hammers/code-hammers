import React from "react";
import { IProfile } from "../../../types/profile";

interface ProfileThumbProps {
  profile: IProfile;
}

const ProfileThumb = ({ profile }: ProfileThumbProps): JSX.Element => {
  const defaultImage = "https://picsum.photos/200";

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-4 rounded-lg flex flex-col items-center justify-center h-64 w-64">
      <img
        src={profile.profilePhoto || defaultImage}
        alt={profile.fullName || "Default Profile"}
        className="rounded-full h-24 w-24 object-cover mb-4"
      />

      <h1 className="text-xl font-bold mb-2">{profile.fullName}</h1>
      <h2 className="text-md mb-2">{profile.personalBio}</h2>
    </div>
  );
};

export default ProfileThumb;
